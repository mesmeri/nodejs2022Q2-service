/*
  Warnings:

  - The primary key for the `Album` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "Album" DROP CONSTRAINT "Album_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Album_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Album_id_seq";
