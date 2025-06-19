/*
  Warnings:

  - A unique constraint covering the columns `[placeName]` on the table `Place` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Place_placeName_key" ON "Place"("placeName");
