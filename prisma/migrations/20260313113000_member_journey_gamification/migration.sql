-- CreateEnum
CREATE TYPE "JourneyTriggerType" AS ENUM (
  'MANUAL',
  'PROFILE_COMPLETED',
  'ONBOARDING_COMPLETED',
  'FIRST_ATTENDANCE',
  'ATTENDANCE_STREAK',
  'JOINED_MINISTRY',
  'JOINED_GROUP',
  'FIRST_PRAYER_REQUEST',
  'SCALE_CONFIRMED'
);

-- CreateTable
CREATE TABLE "JourneyStage" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "order" INTEGER NOT NULL,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "visibleToMember" BOOLEAN NOT NULL DEFAULT true,
  "pointsReward" INTEGER NOT NULL DEFAULT 0,
  "churchId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "JourneyStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyTask" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "title" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "points" INTEGER NOT NULL DEFAULT 0,
  "required" BOOLEAN NOT NULL DEFAULT true,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "triggerType" "JourneyTriggerType" NOT NULL DEFAULT 'MANUAL',
  "stageId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "JourneyTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "JourneyAchievement" (
  "id" TEXT NOT NULL,
  "key" TEXT NOT NULL,
  "name" TEXT NOT NULL,
  "description" TEXT NOT NULL,
  "icon" TEXT NOT NULL,
  "points" INTEGER NOT NULL DEFAULT 0,
  "active" BOOLEAN NOT NULL DEFAULT true,
  "churchId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "JourneyAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonJourney" (
  "id" TEXT NOT NULL,
  "score" INTEGER NOT NULL DEFAULT 0,
  "level" INTEGER NOT NULL DEFAULT 1,
  "progress" INTEGER NOT NULL DEFAULT 0,
  "startedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "completedAt" TIMESTAMP(3),
  "lastActivityAt" TIMESTAMP(3),
  "personId" TEXT NOT NULL,
  "currentStageId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "PersonJourney_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonJourneyTask" (
  "id" TEXT NOT NULL,
  "completed" BOOLEAN NOT NULL DEFAULT false,
  "completedAt" TIMESTAMP(3),
  "source" "JourneyTriggerType" NOT NULL DEFAULT 'MANUAL',
  "personId" TEXT NOT NULL,
  "journeyId" TEXT NOT NULL,
  "taskId" TEXT NOT NULL,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL,

  CONSTRAINT "PersonJourneyTask_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonAchievement" (
  "id" TEXT NOT NULL,
  "earnedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "personId" TEXT NOT NULL,
  "achievementId" TEXT NOT NULL,

  CONSTRAINT "PersonAchievement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PersonJourneyStageHistory" (
  "id" TEXT NOT NULL,
  "movedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "notes" TEXT,
  "source" "JourneyTriggerType" NOT NULL DEFAULT 'MANUAL',
  "journeyId" TEXT NOT NULL,
  "fromStageId" TEXT,
  "toStageId" TEXT NOT NULL,

  CONSTRAINT "PersonJourneyStageHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "JourneyStage_churchId_key_key" ON "JourneyStage"("churchId", "key");
CREATE UNIQUE INDEX "JourneyStage_churchId_order_key" ON "JourneyStage"("churchId", "order");
CREATE INDEX "JourneyStage_churchId_active_idx" ON "JourneyStage"("churchId", "active");

CREATE UNIQUE INDEX "JourneyTask_stageId_key_key" ON "JourneyTask"("stageId", "key");
CREATE INDEX "JourneyTask_stageId_active_idx" ON "JourneyTask"("stageId", "active");

CREATE UNIQUE INDEX "JourneyAchievement_churchId_key_key" ON "JourneyAchievement"("churchId", "key");
CREATE INDEX "JourneyAchievement_churchId_active_idx" ON "JourneyAchievement"("churchId", "active");

CREATE UNIQUE INDEX "PersonJourney_personId_key" ON "PersonJourney"("personId");
CREATE INDEX "PersonJourney_currentStageId_idx" ON "PersonJourney"("currentStageId");

CREATE UNIQUE INDEX "PersonJourneyTask_journeyId_taskId_key" ON "PersonJourneyTask"("journeyId", "taskId");
CREATE INDEX "PersonJourneyTask_personId_completed_idx" ON "PersonJourneyTask"("personId", "completed");

CREATE UNIQUE INDEX "PersonAchievement_personId_achievementId_key" ON "PersonAchievement"("personId", "achievementId");
CREATE INDEX "PersonAchievement_personId_idx" ON "PersonAchievement"("personId");

CREATE INDEX "PersonJourneyStageHistory_journeyId_movedAt_idx" ON "PersonJourneyStageHistory"("journeyId", "movedAt");

-- AddForeignKey
ALTER TABLE "JourneyStage"
ADD CONSTRAINT "JourneyStage_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "JourneyTask"
ADD CONSTRAINT "JourneyTask_stageId_fkey" FOREIGN KEY ("stageId") REFERENCES "JourneyStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "JourneyAchievement"
ADD CONSTRAINT "JourneyAchievement_churchId_fkey" FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PersonJourney"
ADD CONSTRAINT "PersonJourney_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PersonJourney"
ADD CONSTRAINT "PersonJourney_currentStageId_fkey" FOREIGN KEY ("currentStageId") REFERENCES "JourneyStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "PersonJourneyTask"
ADD CONSTRAINT "PersonJourneyTask_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PersonJourneyTask"
ADD CONSTRAINT "PersonJourneyTask_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "PersonJourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PersonJourneyTask"
ADD CONSTRAINT "PersonJourneyTask_taskId_fkey" FOREIGN KEY ("taskId") REFERENCES "JourneyTask"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PersonAchievement"
ADD CONSTRAINT "PersonAchievement_personId_fkey" FOREIGN KEY ("personId") REFERENCES "Person"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PersonAchievement"
ADD CONSTRAINT "PersonAchievement_achievementId_fkey" FOREIGN KEY ("achievementId") REFERENCES "JourneyAchievement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PersonJourneyStageHistory"
ADD CONSTRAINT "PersonJourneyStageHistory_journeyId_fkey" FOREIGN KEY ("journeyId") REFERENCES "PersonJourney"("id") ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE "PersonJourneyStageHistory"
ADD CONSTRAINT "PersonJourneyStageHistory_fromStageId_fkey" FOREIGN KEY ("fromStageId") REFERENCES "JourneyStage"("id") ON DELETE SET NULL ON UPDATE CASCADE;

ALTER TABLE "PersonJourneyStageHistory"
ADD CONSTRAINT "PersonJourneyStageHistory_toStageId_fkey" FOREIGN KEY ("toStageId") REFERENCES "JourneyStage"("id") ON DELETE CASCADE ON UPDATE CASCADE;
