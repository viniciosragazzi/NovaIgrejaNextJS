-- CreateEnum
CREATE TYPE "VolunteerScaleResponseStatus" AS ENUM (
  'PENDING',
  'CONFIRMED',
  'DECLINED',
  'SWAP_REQUESTED'
);

-- AlterTable
ALTER TABLE "VolunteerScale"
ADD COLUMN "responseNote" TEXT,
ADD COLUMN "respondedAt" TIMESTAMP(3),
ADD COLUMN "responseStatus" "VolunteerScaleResponseStatus" NOT NULL DEFAULT 'PENDING';

-- Backfill existing confirmations
UPDATE "VolunteerScale"
SET
  "responseStatus" = CASE
    WHEN "confirmed" = true THEN 'CONFIRMED'::"VolunteerScaleResponseStatus"
    ELSE 'PENDING'::"VolunteerScaleResponseStatus"
  END,
  "respondedAt" = CASE
    WHEN "confirmed" = true THEN COALESCE("updatedAt", CURRENT_TIMESTAMP)
    ELSE NULL
  END;
