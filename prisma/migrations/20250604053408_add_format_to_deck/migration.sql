/*
  Warnings:

  - Added the required column `format` to the `Deck` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Deck` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Deck" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "exactCards" INTEGER,
ADD COLUMN     "format" TEXT NOT NULL,
ADD COLUMN     "minCards" INTEGER,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;
