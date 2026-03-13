-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM (
  'VOLUNTEER_ASSIGNED_TO_SCALE',
  'VOLUNTEER_CONFIRMED_SCALE',
  'VOLUNTEER_DECLINED_SCALE',
  'VOLUNTEER_REQUESTED_SWAP'
);

-- CreateTable
CREATE TABLE "Notification" (
  "id" TEXT NOT NULL,
  "type" "NotificationType" NOT NULL,
  "title" TEXT NOT NULL,
  "message" TEXT NOT NULL,
  "link" TEXT,
  "entityType" TEXT,
  "entityId" TEXT,
  "metadata" JSONB,
  "readAt" TIMESTAMP(3),
  "churchId" TEXT NOT NULL,
  "recipientUserId" TEXT NOT NULL,
  "actorUserId" TEXT,
  "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

  CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Notification_churchId_recipientUserId_createdAt_idx"
ON "Notification"("churchId", "recipientUserId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "Notification_recipientUserId_readAt_idx"
ON "Notification"("recipientUserId", "readAt");

-- CreateIndex
CREATE INDEX "Notification_entityType_entityId_idx"
ON "Notification"("entityType", "entityId");

-- AddForeignKey
ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_churchId_fkey"
FOREIGN KEY ("churchId") REFERENCES "Church"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_recipientUserId_fkey"
FOREIGN KEY ("recipientUserId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification"
ADD CONSTRAINT "Notification_actorUserId_fkey"
FOREIGN KEY ("actorUserId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
