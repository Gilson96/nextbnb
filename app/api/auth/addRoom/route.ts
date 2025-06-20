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
    } = body;

    let place = await prisma.place.findUnique({
      where: { placeName },
    });

    if (!place) {
      place = await prisma.place.create({
        data: { placeName },
      });
    }

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
      },
    });

    await prisma.roomGallery.create({
      data: {
        roomId: newRoom.id,
        imageUrl: gallery,
      },
    });

    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json({ error: "Error creating room" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
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
    const { searchParams } = new URL(req.url);
    const roomId = searchParams.get("roomId");

    if (!roomId) {
      return NextResponse.json(
        { message: "Room ID is required" },
        { status: 400 },
      );
    }

    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room || room.ownerId !== user.id) {
      return NextResponse.json(
        { message: "Room not found or unauthorized" },
        { status: 404 },
      );
    }

    await prisma.roomGallery.deleteMany({ where: { roomId } });
    await prisma.room.delete({ where: { id: roomId } });

    return NextResponse.json(
      { message: "Room deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json(
      { message: "Error deleting room" },
      { status: 500 },
    );
  }
}
