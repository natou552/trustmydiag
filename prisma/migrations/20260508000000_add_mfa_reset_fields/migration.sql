-- AlterTable: add MFA and password reset fields to User
ALTER TABLE "User" ADD COLUMN "phone" TEXT;
ALTER TABLE "User" ADD COLUMN "phoneVerified" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "mfaEnabled" BOOLEAN NOT NULL DEFAULT false;
ALTER TABLE "User" ADD COLUMN "mfaToken" TEXT;
ALTER TABLE "User" ADD COLUMN "mfaTokenExpiry" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "otpCode" TEXT;
ALTER TABLE "User" ADD COLUMN "otpExpiry" TIMESTAMP(3);
ALTER TABLE "User" ADD COLUMN "resetToken" TEXT;
ALTER TABLE "User" ADD COLUMN "resetTokenExpiry" TIMESTAMP(3);
