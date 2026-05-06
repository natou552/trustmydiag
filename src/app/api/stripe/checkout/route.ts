import { NextResponse } from "next/server";
import Stripe from "stripe";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { requestId } = await req.json();

  const request = await prisma.request.findUnique({
    where: { id: requestId, userId: session.user.id },
    include: { user: true },
  });

  if (!request) return NextResponse.json({ error: "Request not found" }, { status: 404 });

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID,
        quantity: 1,
      },
    ],
    customer_email: session.user.email!,
    metadata: { requestId },
    success_url: `${process.env.NEXTAUTH_URL}/dashboard?payment=success`,
    cancel_url: `${process.env.NEXTAUTH_URL}/dashboard/new?cancelled=true`,
  });

  await prisma.request.update({
    where: { id: requestId },
    data: { stripeId: checkoutSession.id },
  });

  return NextResponse.json({ url: checkoutSession.url });
}
