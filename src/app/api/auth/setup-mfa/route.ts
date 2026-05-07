import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { sendOtpSms } from "@/lib/sms";

// POST /api/auth/setup-mfa — send OTP to phone OR verify OTP to enable MFA
export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) return NextResponse.json({ error: "Non authentifié" }, { status: 401 });

  const body = await req.json();

  // Step: send OTP to new phone number
  if (body.action === "send") {
    const { phone } = body;
    if (!phone) return NextResponse.json({ error: "Numéro requis" }, { status: 400 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 8);
    const mfaToken = crypto.randomBytes(16).toString("hex");

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        phone,
        mfaToken,
        mfaTokenExpiry: new Date(Date.now() + 10 * 60 * 1000),
        otpCode: hashedOtp,
        otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
      },
    });

    await sendOtpSms(phone, otp);
    return NextResponse.json({ ok: true, mfaToken });
  }

  // Step: verify OTP and enable MFA
  if (body.action === "verify") {
    const { otp, mfaToken } = body;
    if (!otp || !mfaToken) return NextResponse.json({ error: "Données manquantes" }, { status: 400 });

    const user = await prisma.user.findFirst({
      where: { id: session.user.id, mfaToken, mfaTokenExpiry: { gt: new Date() } },
    });

    if (!user || !user.otpCode || !user.otpExpiry) {
      return NextResponse.json({ error: "Session expirée" }, { status: 400 });
    }
    if (user.otpExpiry < new Date()) {
      return NextResponse.json({ error: "Code expiré" }, { status: 400 });
    }

    const valid = await bcrypt.compare(otp, user.otpCode);
    if (!valid) return NextResponse.json({ error: "Code incorrect" }, { status: 400 });

    await prisma.user.update({
      where: { id: session.user.id },
      data: {
        phoneVerified: true,
        mfaEnabled: true,
        mfaToken: null,
        mfaTokenExpiry: null,
        otpCode: null,
        otpExpiry: null,
      },
    });

    return NextResponse.json({ ok: true });
  }

  // Disable MFA
  if (body.action === "disable") {
    await prisma.user.update({
      where: { id: session.user.id },
      data: { mfaEnabled: false, phone: null, phoneVerified: false },
    });
    return NextResponse.json({ ok: true });
  }

  return NextResponse.json({ error: "Action inconnue" }, { status: 400 });
}
