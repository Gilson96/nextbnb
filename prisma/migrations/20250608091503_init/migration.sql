/*
  Warnings:

  - You are about to drop the column `reviewDate` on the `RoomReviews` table. All the data in the column will be lost.
  - Added the required column `reviewDescription` to the `RoomReviews` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RoomReviews" DROP COLUMN "reviewDate",
ADD COLUMN     "reviewDescription" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "RoomGallery" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "RoomGallery_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "RoomGallery" ADD CONSTRAINT "RoomGallery_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
