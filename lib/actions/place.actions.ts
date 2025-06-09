"use server";
import {prisma} from "@/db/prisma";

// Get places
export async function getPlaces() {
  const data = await prisma.place.findMany();
  return data;
}

// Get Rooms by place
export async function getRooms() {
  const data = await prisma.room.findMany();
  return data;
}
// OldHam rooms
export async function getOldHamRooms() {
  let hosts = [];
  for (let i = 0; i <= 5; i++) {
    hosts.push(...(await prisma.room.findMany({ where: { hostId: i } })));
  }
  return hosts;
}
// Bolton rooms
export async function getBoltonRooms() {
  let hosts = [];
  for (let i = 6; i <= 10; i++) {
    hosts.push(...(await prisma.room.findMany({ where: { hostId: i } })));
  }
  return hosts;
}
// Salford rooms
export async function getSalfordRooms() {
  let hosts = [];
  for (let i = 11; i <= 15; i++) {
    hosts.push(...(await prisma.room.findMany({ where: { hostId: i } })));
  }
  return hosts;
}
// Stockport rooms
export async function getStockportRooms() {
  let hosts = [];
  for (let i = 16; i <= 20; i++) {
    hosts.push(...(await prisma.room.findMany({ where: { hostId: i } })));
  }
  return hosts;
}

export async function getHosts() {
  const hosts = await prisma.host.findMany();
  return hosts;
}

export async function getAmenities() {
  const amenities = await prisma.roomAmenities.findMany();
  return amenities;
}

export async function getReviews() {
  const amenities = await prisma.roomReviews.findMany();
  return amenities;
}
