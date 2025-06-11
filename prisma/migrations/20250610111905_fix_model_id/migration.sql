/*
  Warnings:

  - The primary key for the `Host` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Host` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Place` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Place` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `Room` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Room` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `RoomAmenities` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RoomAmenities` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `RoomGallery` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RoomGallery` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `RoomReviews` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RoomReviews` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `placeId` on the `Host` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `placeName` on table `Place` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `hostId` on the `Room` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roomId` on the `RoomAmenities` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roomId` on the `RoomGallery` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `roomId` on the `RoomReviews` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Host" DROP CONSTRAINT "Host_placeId_fkey";

-- DropForeignKey
ALTER TABLE "Room" DROP CONSTRAINT "Room_hostId_fkey";

-- DropForeignKey
ALTER TABLE "RoomAmenities" DROP CONSTRAINT "RoomAmenities_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomGallery" DROP CONSTRAINT "RoomGallery_roomId_fkey";

-- DropForeignKey
ALTER TABLE "RoomReviews" DROP CONSTRAINT "RoomReviews_roomId_fkey";

-- AlterTable
ALTER TABLE "Host" DROP CONSTRAINT "Host_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "placeId",
ADD COLUMN     "placeId" UUID NOT NULL,
ADD CONSTRAINT "Host_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Place" DROP CONSTRAINT "Place_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
ALTER COLUMN "placeName" SET NOT NULL,
ADD CONSTRAINT "Place_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Room" DROP CONSTRAINT "Room_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "hostId",
ADD COLUMN     "hostId" UUID NOT NULL,
ADD CONSTRAINT "Room_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RoomAmenities" DROP CONSTRAINT "RoomAmenities_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "roomId",
ADD COLUMN     "roomId" UUID NOT NULL,
ADD CONSTRAINT "RoomAmenities_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RoomGallery" DROP CONSTRAINT "RoomGallery_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "roomId",
ADD COLUMN     "roomId" UUID NOT NULL,
ADD CONSTRAINT "RoomGallery_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RoomReviews" DROP CONSTRAINT "RoomReviews_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT gen_random_uuid(),
DROP COLUMN "roomId",
ADD COLUMN     "roomId" UUID NOT NULL,
ADD CONSTRAINT "RoomReviews_pkey" PRIMARY KEY ("id");

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAmenities" ADD CONSTRAINT "RoomAmenities_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomReviews" ADD CONSTRAINT "RoomReviews_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomGallery" ADD CONSTRAINT "RoomGallery_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE CASCADE ON UPDATE CASCADE;
