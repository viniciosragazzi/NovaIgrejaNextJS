DO $$
BEGIN
  IF to_regclass('"Notification"') IS NOT NULL THEN
    ALTER TABLE "Notification" ALTER COLUMN "updatedAt" DROP DEFAULT;
  END IF;
END $$;
