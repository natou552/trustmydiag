import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {
  const { mfaToken, otp } = await req.json();
  if (!mfaToken || !otp) return NextResponse.json({ error: "Données manquantes" }, { status: 400 });

  const user = await prisma.user.findFirst({
    where: { mfaToken, mfaTokenExpiry: { gt: new Date() } },
  });

  if (!user || !user.otpCode || !user.otpExpiry) {
    return NextResponse.json({ error: "Session expirée" }, { status: 400 });
  }

  if (user.otpExpiry < new Date()) {
    return NextResponse.json({ error: "Code expiré. Reconnectez-vous." }, { status: 400 });
  }

  const valid = await bcrypt.compare(otp, user.otpCode);
  if (!valid) return NextResponse.json({ error: "Code incorrect" }, { status: 400 });

  // Clear OTP (keep mfaToken so authorize() step='mfa' can find user with otpCode=null)
  await prisma.user.update({
    where: { id: user.id },
    data: { otpCode: null, otpExpiry: null },
  });

  return NextResponse.json({ ok: true, mfaToken });
}
