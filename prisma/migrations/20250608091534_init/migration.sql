/*
  Warnings:

  - Added the required column `reviewDate` to the `RoomReviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomReviews" ADD COLUMN     "reviewDate" TEXT NOT NULL;
