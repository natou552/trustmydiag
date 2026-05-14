/**
 * Script de création du compte médecin générique
 * Usage : npx tsx scripts/create-doctor.ts
 */

import { resolve } from "path";

// Charge le .env AVANT tout le reste
process.loadEnvFile(resolve(process.cwd(), ".env"));

import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";
import bcrypt from "bcryptjs";

const DOCTOR_EMAIL     = "medecin@trustmydiag.com";
const DOCTOR_MFA_EMAIL = "nathanaelbenguigui@gmail.com";
const DOCTOR_PASSWORD  = "YRExfByzpPPmGt6BjcpqCN77!zkCj7dYr6X6tx";
const DOCTOR_NAME      = "Dr. TrustMyDiag";

async function main() {
  const connectionString = process.env.POSTGRES_PRISMA_URL ?? process.env.DATABASE_URL!;

  if (!connectionString) {
    throw new Error("DATABASE_URL ou POSTGRES_PRISMA_URL introuvable dans le .env");
  }

  const pool = new pg.Pool({
    connectionString,
    max: 1,
    idleTimeoutMillis: 10_000,
    connectionTimeoutMillis: 10_000,
    ssl: { rejectUnauthorized: false },
  });

  const adapter = new PrismaPg(pool);
  const prisma  = new PrismaClient({ adapter });

  try {
    const hashed = await bcrypt.hash(DOCTOR_PASSWORD, 12);

    const doctor = await prisma.user.upsert({
      where:  { email: DOCTOR_EMAIL },
      update: { role: "DOCTOR", password: hashed, emailVerified: new Date(), mfaEnabled: true, mfaEmail: DOCTOR_MFA_EMAIL },
      create: {
        email:         DOCTOR_EMAIL,
        name:          DOCTOR_NAME,
        password:      hashed,
        role:          "DOCTOR",
        emailVerified: new Date(),
        mfaEnabled:    true,
        mfaEmail:      DOCTOR_MFA_EMAIL,
      },
    });

    console.log("\n✅ Compte médecin prêt !");
    console.log("─────────────────────────────────");
    console.log(`📧 Connexion : ${DOCTOR_EMAIL}`);
    console.log(`📨 OTP MFA   : ${DOCTOR_MFA_EMAIL}`);
    console.log(`🔒 Rôle      : ${doctor.role}`);
    console.log("─────────────────────────────────");
    console.log("👉 Connecte-toi sur /login puis va sur /admin");
    console.log("🔐 MFA activé : un code OTP sera envoyé à cet email à chaque connexion\n");
  } finally {
    await prisma.$disconnect();
    await pool.end();
  }
}

main().catch((e) => { console.error("❌ Erreur :", e); process.exit(1); });
