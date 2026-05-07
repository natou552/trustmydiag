import { NextAuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";
import { sendOtpSms } from "@/lib/sms";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma) as never,
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        mfaToken: { label: "MFA Token", type: "text" },
        step: { label: "Step", type: "text" },
      },
      async authorize(credentials) {
        // Step 2: complete MFA login using mfaToken (OTP already verified by /api/auth/verify-mfa)
        if (credentials?.step === "mfa" && credentials?.mfaToken) {
          const user = await prisma.user.findFirst({
            where: {
              mfaToken: credentials.mfaToken,
              mfaTokenExpiry: { gt: new Date() },
              otpCode: null, // null means OTP was verified and cleared
            },
          });
          if (!user) throw new Error("MFA_INVALID");
          await prisma.user.update({
            where: { id: user.id },
            data: { mfaToken: null, mfaTokenExpiry: null },
          });
          return { id: user.id, email: user.email, name: user.name, role: user.role };
        }

        // Step 1: normal credentials check
        if (!credentials?.email || !credentials?.password) return null;

        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;
        if (!user.emailVerified) throw new Error("EMAIL_NOT_VERIFIED");

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        // MFA enabled: generate token + OTP, send by email
        if (user.mfaEnabled) {
          const mfaToken = crypto.randomBytes(32).toString("hex");
          const otp = Math.floor(100000 + Math.random() * 900000).toString();
          const hashedOtp = await bcrypt.hash(otp, 8);

          await prisma.user.update({
            where: { id: user.id },
            data: {
              mfaToken,
              mfaTokenExpiry: new Date(Date.now() + 10 * 60 * 1000),
              otpCode: hashedOtp,
              otpExpiry: new Date(Date.now() + 5 * 60 * 1000),
            },
          });

          try {
            await sendOtpSms(user.email, otp);
          } catch (err) {
            console.error("[auth] sendOtpEmail failed:", err);
          }

          throw new Error(`MFA_REQUIRED:${mfaToken}`);
        }

        return { id: user.id, email: user.email, name: user.name, role: user.role };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as { role?: string }).role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
};
