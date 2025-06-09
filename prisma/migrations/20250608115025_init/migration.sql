/*
  Warnings:

  - You are about to drop the column `roomGallery` on the `Room` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Room" DROP COLUMN "roomGallery";

-- CreateTable
CREATE TABLE "RoomGallery" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "RoomGallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomGallery" ADD CONSTRAINT "RoomGallery_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
