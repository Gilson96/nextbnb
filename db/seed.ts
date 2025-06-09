import { PrismaClient } from "@/lib/generated/prisma";
import {
  places,
  amenitiesPool,
  imageBase,
  reviewNames,
  roomTypes,
  ukHostNames,
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
  let reviewIndex = 0;
  let hostIndex = 0;
  let roomCounter = 0;

  // Loop through each place
  for (const placeName of places) {
    const createdPlace = await prisma.place.create({
      data: {
        placeName,
      },
    });

    // Add 5 hosts per place
    for (let i = 0; i < 5; i++) {
      const hostName = ukHostNames[hostIndex % ukHostNames.length];
      const host = await prisma.host.create({
        data: {
          hostName,
          hostingYears: Math.floor(Math.random() * 10 + 1),
          hostDescription: `Local host in ${placeName} offering unique stays with a personal touch.`,
          placeId: createdPlace.id,
        },
      });

      // Create 1 room per host
      const roomType = roomTypes[i % roomTypes.length];
      const roomDescription = `${roomType} in ${placeName}`;
      const roomAbout = `Enjoy a comfortable ${roomType.toLowerCase()} in the heart of ${placeName}.
Perfect for visitors and business travelers alike.
Walking distance to local shops and transport.
Quiet neighborhood with excellent amenities.
Experience Manchester like a local.`;

      const room = await prisma.room.create({
        data: {
          roomDescription,
          roomType,
          roomRating: parseFloat((Math.random() * 2 + 3).toFixed(2)),
          roomLatitude: randomCoord(),
          roomLongitude: parseFloat((-2.24 + Math.random() * 0.1).toFixed(6)),
          roomPrice: randomPrice(),
          roomAbout,
          hostId: host.id,
        },
      });

      // Add 4 random amenities
      const amenities = getRandomElements(amenitiesPool, 4).map((amenity) => ({
        roomId: room.id,
        amenityName: amenity,
      }));
      await prisma.roomAmenities.createMany({ data: amenities });

      // Add 3 images to room gallery
      // it loops over numbers 1,2,3
      // for each number, it bulds an object
      // then takes the created roomGallery
      // and inserts all 3
      const gallery = [1, 2, 3].map((num) => ({
        roomId: room.id,
        imageUrl: `${imageBase}/${placeName.toLowerCase()}-${i + 1}-${num}.jpg`,
      }));
      await prisma.roomGallery.createMany({ data: gallery });

      // Add 3 reviews with random names and descriptions
      const roomReviews = Array.from({ length: 3 }, () => {
        const names = reviewNames;
        const name = names[reviewIndex % names.length];
        const description = generateReviewDescription(
          roomType,
          placeName,
          hostName,
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

      roomCounter++;
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
