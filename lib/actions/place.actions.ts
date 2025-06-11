"use server";
import { prisma } from "@/db/prisma";
import { Decimal } from "@prisma/client/runtime/library";

export type PlacesType = {
  id: string;
  placeName: string;
};
export type RoomsType = {
  id: string;
  roomDescription: string;
  roomType: string;
  roomRating: number;
  roomLatitude: number;
  roomLongitude: number;
  roomLocation: string;
  roomPrice: number;
  roomAbout: string;
  hostId: string;
};
export type GalleryTypes = {
  id: string;
  imageUrl: string[];
  roomId: string;
};
export type HostsTypes = {
  id: string;
  hostName: string;
  hostingYears: number;
  hostDescription: string;
  placeId: string;
};
export type AmenetiesTypes = {
  id: string;
  amenityName: string;
  roomId: string;
};
export type ReviewesTypes = {
  id: string;
  roomId: string;
  reviewPersonName: string;
  reviewDescription: string;
  reviewDate: string;
};

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
