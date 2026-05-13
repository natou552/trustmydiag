-- Change default for mfaEnabled to true
ALTER TABLE "User" ALTER COLUMN "mfaEnabled" SET DEFAULT true;

-- Enable MFA for all existing users
UPDATE "User" SET "mfaEnabled" = true WHERE "mfaEnabled" = false;
