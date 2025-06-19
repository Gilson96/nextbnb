/*
  Warnings:

  - Added the required column `payementAmount` to the `Booking` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payementMethod` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "payementAmount" INTEGER NOT NULL,
ADD COLUMN     "payementMethod" TEXT NOT NULL;
