import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcryptjs";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

async function main() {
  const password = await bcrypt.hash("Doctor1234!", 12);

  await prisma.user.upsert({
    where: { email: "dr.benguigui@trustmydiag.fr" },
    update: {},
    create: {
      name: "Dr Robert Benguigui",
      email: "dr.benguigui@trustmydiag.fr",
      password,
      role: "DOCTOR",
      emailVerified: new Date(),
    },
  });

  await prisma.user.upsert({
    where: { email: "dr.benchimol@trustmydiag.fr" },
    update: {},
    create: {
      name: "Dr Yohan Benchimol",
      email: "dr.benchimol@trustmydiag.fr",
      password,
      role: "DOCTOR",
      emailVerified: new Date(),
    },
  });

  console.log("✅ Seed terminé — comptes médecins créés");
  console.log("   dr.benguigui@trustmydiag.fr / Doctor1234!");
  console.log("   dr.benchimol@trustmydiag.fr / Doctor1234!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
