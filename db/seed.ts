import { PrismaClient } from "@/lib/generated/prisma";
import {
  places,
  amenitiesPool,
  galleryPool,
  reviewNames,
  roomTypes,
  ukHostNames,
  users,
} from "./data_pools";
import {
  getRandomElements,
  generateReviewDescription,
  randomCoord,
  randomDateWithinPastYear,
  randomPrice,
} from "./data_logic";

const prisma = new PrismaClient();

async function main() {
  await prisma.roomAmenities.deleteMany();
  await prisma.roomGallery.deleteMany();
  await prisma.roomReviews.deleteMany();
  await prisma.room.deleteMany();
  await prisma.host.deleteMany();
  await prisma.place.deleteMany();
  await prisma.account.deleteMany();
  await prisma.verificationToken.deleteMany();
  await prisma.session.deleteMany();
  await prisma.user.deleteMany();
  await prisma.user.createMany({ data: users });

  let reviewIndex = 0;
  let hostIndex = 0;

  for (const placeName of places) {
    const createdPlace = await prisma.place.create({
      data: {
        placeName,
      },
    });

    for (let i = 0; i < 5; i++) {
      const hostName = ukHostNames[hostIndex % ukHostNames.length];
      const host = await prisma.host.create({
        data: {
          hostName,
          hostingYears: Math.floor(Math.random() * 10 + 1),
          hostDescription: `Local host in ${placeName} offering unique stays with a personal touch. 
          All our rooms are carefully prepared to provide an exceptional experience, ensuring comfort, privacy, and a warm welcome to all guests visiting ${placeName}. We take pride in offering personalized recommendations and support throughout your stay.`,
          placeId: createdPlace.id,
        },
      });

      const roomType = roomTypes[i % roomTypes.length];
      const roomDescription = `${roomType} in ${placeName}`;
      const roomAbout = `Enjoy a comfortable ${roomType.toLowerCase()} in the heart of ${placeName}.
Perfect for visitors and business travelers alike.
Walking distance to local shops and transport.
Quiet neighborhood with excellent amenities.
Experience ${placeName} like a local.`;

      const room = await prisma.room.create({
        data: {
          roomDescription,
          roomType,
          roomRating: parseFloat((Math.random() * 2 + 3).toFixed(2)),
          roomLatitude: randomCoord(),
          roomLongitude: parseFloat((-2.24 + Math.random() * 0.1).toFixed(6)),
          roomPrice: randomPrice(),
          roomLocation: placeName,
          roomAbout,
          hostId: host.id,
          ownerId: null,
        },
      });

      const amenities = getRandomElements(amenitiesPool, 4).map((amenity) => ({
        roomId: room.id,
        amenityName: amenity,
      }));
      await prisma.roomAmenities.createMany({ data: amenities });

      const gallery = () => {
        if (roomType === "Single room")
          return { roomId: room.id, imageUrl: galleryPool[0].singleRoom };
        if (roomType === "Double room")
          return { roomId: room.id, imageUrl: galleryPool[1].doubleRoom };
        if (roomType === "1-bedroom apartment")
          return { roomId: room.id, imageUrl: galleryPool[2].oneBedroomFlat };
        if (roomType === "Studio")
          return { roomId: room.id, imageUrl: galleryPool[3].studio };
        if (roomType === "Entire place")
          return { roomId: room.id, imageUrl: galleryPool[4].entirePlace };
      };
      await prisma.roomGallery.createMany({ data: gallery()! });

      const roomReviews = Array.from({ length: 3 }, () => {
        const names = reviewNames;
        const name = names[reviewIndex % names.length];
        const description = generateReviewDescription(
          roomType,
          placeName,
          hostName
        );
        const reviewDate = randomDateWithinPastYear();
        reviewIndex++;
        return {
          roomId: room.id,
          reviewPersonName: name,
          reviewDescription: description,
          reviewDate,
        };
      });
      await prisma.roomReviews.createMany({ data: roomReviews });

      hostIndex++;
    }
  }
}

main()
  .then(() => console.log("Database seeded successfully"))
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
