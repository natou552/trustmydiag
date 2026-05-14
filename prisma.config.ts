import { defineConfig } from "prisma/config";
import { config } from "dotenv";

// Prisma 7 does not auto-load .env — load it manually
config();

export default defineConfig({
  datasource: {
    // URL used by prisma migrate deploy / prisma db push
    url:
      process.env.POSTGRES_URL_NON_POOLING ??
      process.env.DATABASE_URL,
  },
});
