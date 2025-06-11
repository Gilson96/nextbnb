/*
  Warnings:

  - The `imageUrl` column on the `RoomGallery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `roomLocation` to the `Room` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Room" ADD COLUMN     "roomLocation" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "RoomGallery" DROP COLUMN "imageUrl",
ADD COLUMN     "imageUrl" TEXT[];
