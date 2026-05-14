-- Convert ageGroup from enum to plain text (stores patient age as a number string)
ALTER TABLE "Request" ALTER COLUMN "ageGroup" TYPE TEXT USING "ageGroup"::TEXT;

-- Drop the old enum type
DROP TYPE IF EXISTS "AgeGroup";
