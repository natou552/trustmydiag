import { defineConfig } from "prisma/config";

export default defineConfig({
  // URL used by prisma migrate deploy / prisma db push
  datasourceUrl:
    process.env.POSTGRES_URL_NON_POOLING ??
    process.env.DATABASE_URL,
});
