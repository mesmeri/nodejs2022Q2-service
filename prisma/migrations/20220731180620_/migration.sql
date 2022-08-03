/*
  Warnings:

  - A unique constraint covering the columns `[id]` on the table `Album` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Album_id_key" ON "Album"("id");
