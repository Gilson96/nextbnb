-- CreateTable
CREATE TABLE "Place" (
    "id" SERIAL NOT NULL,
    "placeName" TEXT,

    CONSTRAINT "Place_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Host" (
    "id" SERIAL NOT NULL,
    "hostName" TEXT NOT NULL,
    "hostingYears" INTEGER NOT NULL,
    "hostDescription" TEXT NOT NULL,
    "placeId" INTEGER NOT NULL,

    CONSTRAINT "Host_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Room" (
    "id" SERIAL NOT NULL,
    "roomDescription" TEXT NOT NULL,
    "roomType" TEXT NOT NULL,
    "roomRating" DECIMAL(2,2) NOT NULL DEFAULT 0,
    "roomLatitude" DECIMAL(20,20) NOT NULL DEFAULT 0,
    "roomLongitude" DECIMAL(20,20) NOT NULL DEFAULT 0,
    "roomPrice" INTEGER NOT NULL,
    "roomAbout" TEXT NOT NULL,
    "hostId" INTEGER NOT NULL,

    CONSTRAINT "Room_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomAmenities" (
    "id" SERIAL NOT NULL,
    "amenityName" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "RoomAmenities_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RoomReviews" (
    "id" SERIAL NOT NULL,
    "reviewPersonName" TEXT NOT NULL,
    "reviewDate" TEXT NOT NULL,
    "roomId" INTEGER NOT NULL,

    CONSTRAINT "RoomReviews_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Host" ADD CONSTRAINT "Host_placeId_fkey" FOREIGN KEY ("placeId") REFERENCES "Place"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Room" ADD CONSTRAINT "Room_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "Host"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomAmenities" ADD CONSTRAINT "RoomAmenities_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "RoomReviews" ADD CONSTRAINT "RoomReviews_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "Room"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
