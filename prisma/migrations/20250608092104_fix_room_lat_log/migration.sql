/*
  Warnings:

  - You are about to alter the column `roomLatitude` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,20)` to `Decimal(9,6)`.
  - You are about to alter the column `roomLongitude` on the `Room` table. The data in that column could be lost. The data in that column will be cast from `Decimal(20,20)` to `Decimal(9,6)`.

*/
-- AlterTable
ALTER TABLE "Room" ALTER COLUMN "roomLatitude" SET DATA TYPE DECIMAL(9,6),
ALTER COLUMN "roomLongitude" SET DATA TYPE DECIMAL(9,6);
