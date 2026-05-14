import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";
import { sendRequestConfirmation, sendDoctorNotification } from "@/lib/email";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY ?? "placeholder");

export async function POST(req: Request) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("[webhook] Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err) {
    console.error("[webhook] Signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  console.log(`[webhook] Received event: ${event.type}`);

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const requestId = session.metadata?.requestId;

    console.log(`[webhook] checkout.session.completed — requestId: ${requestId}`);

    if (!requestId) {
      console.error("[webhook] No requestId in session metadata");
      return NextResponse.json({ ok: true });
    }

    // Idempotency guard: only update if still in PENDING_PAYMENT
    const existing = await prisma.request.findUnique({ where: { id: requestId } });
    if (!existing) {
      console.error(`[webhook] Request ${requestId} not found`);
      return NextResponse.json({ ok: true });
    }
    if (existing.status !== "PENDING_PAYMENT") {
      console.log(`[webhook] Request ${requestId} already processed (status: ${existing.status}) — skipping`);
      return NextResponse.json({ ok: true });
    }

    const request = await prisma.request.update({
      where: { id: requestId },
      data: { status: "PAID" },
      include: { user: true },
    });

    console.log(`[webhook] Request updated — specialty: ${request.specialty}, user: ${request.user.email}`);

    // Parse pdfUrl (stored as JSON array string)
    let pdfUrls: string[] = [];
    try {
      pdfUrls = JSON.parse(request.pdfUrl);
    } catch {
      pdfUrls = request.pdfUrl ? [request.pdfUrl] : [];
    }
    console.log(`[webhook] pdfUrls parsed: ${pdfUrls.length} file(s)`);

    // 1. Patient confirmation — always sent first, independent of doctor config
    try {
      await sendRequestConfirmation(request.user.email, request.user.name, requestId);
      console.log(`[webhook] Patient confirmation sent to ${request.user.email}`);
    } catch (err) {
      console.error("[webhook] sendRequestConfirmation failed:", err);
    }

    // 2. Doctor notification
    const doctorEmail =
      request.specialty === "DENTAL"
        ? process.env.DOCTOR_DENTAL_EMAIL
        : process.env.DOCTOR_GYNECO_EMAIL;

    if (!doctorEmail) {
      console.error(`[webhook] Missing env var for specialty ${request.specialty} — doctor notification skipped`);
      return NextResponse.json({ ok: true });
    }

    const specialtyLabel = request.specialty === "DENTAL" ? "Dentaire" : "Gynécologie";

    try {
      await sendDoctorNotification(
        doctorEmail,
        request.user.name,
        requestId,
        specialtyLabel,
        request.message,
        pdfUrls
      );
      console.log(`[webhook] Doctor notification sent to ${doctorEmail}`);
    } catch (err) {
      console.error("[webhook] sendDoctorNotification failed:", err);
    }
  }

  return NextResponse.json({ ok: true });
}
