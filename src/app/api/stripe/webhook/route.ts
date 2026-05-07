import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendRequestConfirmation, sendDoctorNotification } from "@/lib/email";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const requestId = session.metadata?.requestId;

    if (!requestId) return NextResponse.json({ ok: true });

    const request = await prisma.request.update({
      where: { id: requestId },
      data: { status: "IN_REVIEW" },
      include: { user: true },
    });

    const doctorEmail =
      request.specialty === "DENTAL"
        ? process.env.DOCTOR_DENTAL_EMAIL
        : process.env.DOCTOR_GYNECO_EMAIL;

    if (!doctorEmail) {
      console.error(`[webhook] Missing env var for specialty ${request.specialty}`);
      return NextResponse.json({ ok: true });
    }

    const specialtyLabel = request.specialty === "DENTAL" ? "Dentaire" : "Gynécologie";

    // Parse pdfUrl (stored as JSON array string)
    let pdfUrls: string[] = [];
    try { pdfUrls = JSON.parse(request.pdfUrl); } catch { pdfUrls = [request.pdfUrl]; }

    try {
      await sendRequestConfirmation(request.user.email, request.user.name, requestId);
    } catch (err) {
      console.error("[webhook] sendRequestConfirmation failed:", err);
    }

    try {
      await sendDoctorNotification(
        doctorEmail,
        request.user.name,
        requestId,
        specialtyLabel,
        request.message,
        pdfUrls
      );
    } catch (err) {
      console.error("[webhook] sendDoctorNotification failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
