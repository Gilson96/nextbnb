/*
  Warnings:

  - You are about to drop the `RoomGallery` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "RoomGallery" DROP CONSTRAINT "RoomGallery_roomId_fkey";

-- DropTable
DROP TABLE "RoomGallery";
