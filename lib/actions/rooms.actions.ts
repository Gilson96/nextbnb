import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";
import { prisma } from "@/db/prisma";

export type CreateRoomInput = {
  roomDescription: string;
  roomType: string;
  roomLatitude: number;
  roomLongitude: number;
  roomLocation: string;
  roomPrice: number;
  roomAbout: string;
  placeName: string;
};

export type UpdateRoomInput = {
  roomId: string;
  roomDescription?: string;
  roomType?: string;
  roomLatitude?: number;
  roomLongitude?: number;
  roomLocation?: string;
  roomPrice?: number;
  roomAbout?: string;
};

export async function createRoom(data: CreateRoomInput) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");

  let place = await prisma.place.findUnique({
    where: { placeName: data.placeName },
  });
  if (!place) {
    place = await prisma.place.create({ data: { placeName: data.placeName } });
  }
  if (!place?.id) throw new Error("Place creation failed");

  const newRoom = await prisma.room.create({
    data: {
      roomDescription: data.roomDescription,
      roomType: data.roomType,
      roomLatitude: data.roomLatitude,
      roomLongitude: data.roomLongitude,
      roomLocation: data.roomLocation,
      roomPrice: data.roomPrice,
      roomAbout: data.roomAbout,
      ownerId: user.id,
      placeId: place.id,
      hostId: user.id,
    },
  });

  return newRoom;
}

export async function updateRoom(data: UpdateRoomInput) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");

  if (!data.roomId) throw new Error("Room ID is required");

  // Prisma update doesn't support compound where like { id, ownerId } natively,
  // so verify ownership manually:
  const room = await prisma.room.findUnique({
    where: { id: data.roomId },
  });
  if (!room) throw new Error("Room not found");
  if (room.ownerId !== user.id)
    throw new Error("Unauthorized to update this room");

  const updatedRoom = await prisma.room.update({
    where: { id: data.roomId },
    data: {
      roomDescription: data.roomDescription,
      roomType: data.roomType,
      roomLatitude: data.roomLatitude,
      roomLongitude: data.roomLongitude,
      roomLocation: data.roomLocation,
      roomPrice: data.roomPrice,
      roomAbout: data.roomAbout,
    },
  });

  return updatedRoom;
}

export async function deleteRoom(roomId: string) {
  const session = await getServerSession(authConfig);
  if (!session?.user?.email) throw new Error("Unauthorized");

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
  });
  if (!user) throw new Error("User not found");

  const room = await prisma.room.findUnique({
    where: { id: roomId },
  });
  if (!room) throw new Error("Room not found");
  if (room.ownerId !== user.id)
    throw new Error("Unauthorized to delete this room");

  await prisma.room.delete({
    where: { id: roomId },
  });

  return { message: "Room deleted successfully" };
}
