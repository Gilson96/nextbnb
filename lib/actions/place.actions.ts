"use server";
import { prisma } from "@/db/prisma";

export async function getPlaces() {
  const data = await prisma.place.findMany();
  return data;
}
export async function getHosts() {
  const data = await prisma.host.findMany();
  return data;
}
export async function getRooms() {
  const data = await prisma.room.findMany();
  return data;
}
export async function getRoomAmenities() {
  const data = await prisma.roomAmenities.findMany();
  return data;
}
export async function getRoomReviews() {
  const data = await prisma.roomReviews.findMany();
  return data;
}
export async function getRoomGallery() {
  const data = await prisma.roomGallery.findMany();
  return data;
}
