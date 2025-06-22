"use server";
import { prisma } from "@/db/prisma";

export type BookingTypes = {
  id?: string;
  userId: string;
  roomId: string;
  startDate: Date;
  endDate: Date;
  payementAmount: number;
  payementMethod: string;
};

export type WishlistTypes = {
  id: string;
  createdAt: Date;
  userId: string;
  roomId: string;
};

export const createBooking = async (bookingData: BookingTypes) => {
  const booking = await prisma.booking.create({
    data: {
      user: { connect: { id: bookingData.userId } },
      room: { connect: { id: bookingData.roomId } },
      startDate: bookingData.startDate,
      endDate: bookingData.endDate,
      payementAmount: bookingData.payementAmount,
      payementMethod: bookingData.payementMethod,
    },
  });

  return booking;
};

export const getBookings = async (userId: string) => {
  const bookings = await prisma.booking.findMany({ where: { userId } });
  return bookings;
};

export const addToWishlist = async ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: string;
}) => {
  const wishlistItem = await prisma.wishlist.create({
    data: {
      user: { connect: { id: userId } },
      room: { connect: { id: roomId } },
    },
  });

  return wishlistItem;
};

export const getWishlist = async () => {
  const wishlist = await prisma.wishlist.findMany();
  return wishlist;
};

export const removeFromWishlist = async ({ roomId }: { roomId: string }) => {
  const removedItem = await prisma.wishlist.deleteMany({
    where: { roomId },
  });

  return removedItem;
};
