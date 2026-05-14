import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "@/lib/email";
import crypto from "crypto";

// ── Politique ANSSI ────────────────────────────────────────────────────────────
const COMMON_PASSWORDS = [
  "password1!", "azerty123!", "bonjour1!", "soleil123!", "bienvenu1!",
  "trustmydiag1!", "motdepasse1!", "admin1234!", "france2024!", "paris2024!",
];

function validatePassword(password: string, email: string): boolean {
  if (password.length < 12) return false;
  if (!/[A-Z]/.test(password)) return false;
  if (!/[a-z]/.test(password)) return false;
  if (!/[0-9]/.test(password)) return false;
  if (!/[^A-Za-z0-9]/.test(password)) return false;
  // Ne contient pas le local de l'email (si > 3 chars)
  const local = email.split("@")[0].toLowerCase();
  if (local.length >= 3 && password.toLowerCase().includes(local)) return false;
  // Pas un mot de passe trivial
  if (COMMON_PASSWORDS.includes(password.toLowerCase())) return false;
  return true;
}

export async function POST(req: Request) {
  try {
    const { name, email, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    if (!validatePassword(password, email)) {
      return NextResponse.json({ error: "PASSWORD_POLICY" }, { status: 400 });
    }

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json({ error: "Email already used" }, { status: 409 });
    }

    const hashed = await bcrypt.hash(password, 12);
    const user = await prisma.user.create({
      data: { name, email, password: hashed },
    });

    const token = crypto.randomBytes(32).toString("hex");
    const expires = new Date(Date.now() + 24 * 60 * 60 * 1000);

    await prisma.verificationToken.create({
      data: { identifier: email, token, expires },
    });

    try {
      await sendVerificationEmail(email, name, token);
    } catch (emailErr) {
      console.error("[register] email send failed:", emailErr);
      // Don't block account creation if email fails
    }

    return NextResponse.json({ success: true, userId: user.id });
  } catch (err) {
    console.error("[register] error:", err);
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
