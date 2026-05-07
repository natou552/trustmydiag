import { NextResponse } from "next/server";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendPasswordResetEmail } from "@/lib/email";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email) return NextResponse.json({ error: "Email requis" }, { status: 400 });

  const user = await prisma.user.findUnique({ where: { email } });

  // Always return success to avoid user enumeration
  if (!user) return NextResponse.json({ ok: true });

  const token = crypto.randomBytes(32).toString("hex");
  await prisma.user.update({
    where: { id: user.id },
    data: {
      resetToken: token,
      resetTokenExpiry: new Date(Date.now() + 60 * 60 * 1000),
    },
  });

  try {
    await sendPasswordResetEmail(user.email, user.name, token);
  } catch (err) {
    console.error("[forgot-password] email failed:", err);
  }

  return NextResponse.json({ ok: true });
}
