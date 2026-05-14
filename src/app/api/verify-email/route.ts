import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { sendWelcomeEmail } from "@/lib/email";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const token = searchParams.get("token");

  if (!token) {
    return NextResponse.redirect(new URL("/login?error=invalid_token", req.url));
  }

  const verificationToken = await prisma.verificationToken.findUnique({
    where: { token },
  });

  if (!verificationToken || verificationToken.expires < new Date()) {
    return NextResponse.redirect(new URL("/login?error=token_expired", req.url));
  }

  await prisma.user.update({
    where: { email: verificationToken.identifier },
    data: { emailVerified: new Date() },
  });

  await prisma.verificationToken.delete({ where: { token } });

  const user = await prisma.user.findUnique({
    where: { email: verificationToken.identifier },
    select: { name: true },
  });

  try {
    await sendWelcomeEmail(verificationToken.identifier, user?.name ?? "");
  } catch {
    // Silent — welcome email failure must not block the verification flow
  }

  return NextResponse.redirect(new URL("/login?verified=true", req.url));
}
