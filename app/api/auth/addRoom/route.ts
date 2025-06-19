import { getServerSession } from "next-auth";
import { prisma } from "@/db/prisma";
import { NextResponse } from "next/server";
import { authConfig } from "@/auth";

// Create Room
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

  const body = await req.json();
  const {
    roomDescription,
    roomType,
    roomLatitude,
    roomLongitude,
    roomLocation,
    roomPrice,
    roomAbout,
    placeName,
  } = body;

  try {
    let place = await prisma.place.findUnique({
      where: { placeName },
    });

    if (!place) {
      place = await prisma.place.create({
        data: { placeName },
      });
    }

    if (!place?.id) {
      return NextResponse.json(
        { error: "Place creation failed" },
        { status: 500 },
      );
    }

    const newRoom = await prisma.room.create({
      data: {
        roomDescription,
        roomType,
        roomLatitude,
        roomLongitude,
        roomLocation,
        roomPrice,
        roomAbout,
        ownerId: user.id,
        placeId: place.id,
        hostId: user.id,
      },
    });

    return NextResponse.json(newRoom, { status: 201 });
  } catch (error) {
    console.error("Error creating room:", error);
    return NextResponse.json({ error: "Error creating room" }, { status: 500 });
  }
}

// Update Room
export async function PUT(req: Request) {
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

  const body = await req.json();
  const {
    roomId,
    roomDescription,
    roomType,
    roomLatitude,
    roomLongitude,
    roomLocation,
    roomPrice,
    roomAbout,
  } = body;

  if (!roomId) {
    return NextResponse.json(
      { error: "Room ID is required for update" },
      { status: 400 },
    );
  }

  try {
    const updatedRoom = await prisma.room.update({
      where: { id: roomId, ownerId: user.id },
      data: {
        roomDescription,
        roomType,
        roomLatitude,
        roomLongitude,
        roomLocation,
        roomPrice,
        roomAbout,
      },
    });

    return NextResponse.json(updatedRoom, { status: 200 });
  } catch (error) {
    console.error("Error updating room:", error);
    return NextResponse.json({ error: "Error updating room" }, { status: 500 });
  }
}

// Delete Room
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

  const { searchParams } = new URL(req.url);
  const roomId = searchParams.get("roomId");

  if (!roomId) {
    return NextResponse.json(
      { error: "Room ID is required for deletion" },
      { status: 400 },
    );
  }

  try {
    const room = await prisma.room.findUnique({
      where: { id: roomId },
    });

    if (!room) {
      return NextResponse.json({ error: "Room not found" }, { status: 404 });
    }

    if (room.ownerId !== user.id) {
      return NextResponse.json(
        { error: "Unauthorized to delete this room" },
        { status: 403 },
      );
    }

    await prisma.room.delete({
      where: { id: roomId },
    });

    return NextResponse.json(
      { message: "Room deleted successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting room:", error);
    return NextResponse.json({ error: "Error deleting room" }, { status: 500 });
  }
}
