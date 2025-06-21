import { getServerSession } from "next-auth";
import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth";

export async function POST(req: Request) {
  const session = await getServerSession(authConfig);

  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });

  if (!user) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
  }

  try {
    const body = await req.json();

    const {
      roomDescription,
      roomType,
      roomLatitude,
      roomLongitude,
      roomLocation,
      roomPrice,
      roomAbout,
      gallery,
      placeName,
      roomAmenities,
    } = body;

    let place = await prisma.place.findUnique({ where: { placeName } });

    if (!place) {
      place = await prisma.place.create({ data: { placeName } });
    }

    const randomRating = (Math.random() * (4.9 - 3.2) + 3.2).toFixed(2);

    const newRoom = await prisma.room.create({
      data: {
        roomDescription,
        roomType,
        roomLatitude: parseFloat(roomLatitude),
        roomLongitude: parseFloat(roomLongitude),
        roomLocation,
        roomPrice: parseInt(roomPrice),
        roomAbout,
        ownerId: user.id,
        placeId: place.id,
        hostId: user.id,
        roomRating: parseFloat(randomRating),
      },
    });

    await prisma.roomGallery.create({
      data: {
        roomId: newRoom.id,
        imageUrl: gallery,
      },
    });

    if (Array.isArray(roomAmenities)) {
      const amenityPromises = roomAmenities.map((amenity: string) => {
        return prisma.roomAmenities.create({
          data: {
            amenityName: amenity,
            roomId: newRoom.id,
          },
        });
      });

      await Promise.all(amenityPromises);
    }

    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json({ error: "Error creating room" }, { status: 500 });
  }
}