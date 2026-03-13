ALTER TABLE "Person"
ADD COLUMN "profileImage" TEXT,
ADD COLUMN "onboardingDraft" JSONB,
ADD COLUMN "onboardingCompletedAt" TIMESTAMP(3);
