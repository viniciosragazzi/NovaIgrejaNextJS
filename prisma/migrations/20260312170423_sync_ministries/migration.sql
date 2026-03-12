/*
  Warnings:

  - A unique constraint covering the columns `[name,churchId]` on the table `Ministry` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Ministry_name_churchId_key" ON "Ministry"("name", "churchId");
