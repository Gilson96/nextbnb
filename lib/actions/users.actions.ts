"use server";
import { signInFormSchema } from "../validators/validators";
import { signIn, signOut } from "@/auth";
import axios from "axios";
import { isRedirectError } from "next/dist/client/components/redirect-error";

export type BookingData = {
  userId: string;
  roomId: string;
  startDate: string;
  endDate: string;
};

export type WishlistData = {
  userId: string;
  roomId: string;
};

// sign in the user with credentials
export async function signWithCredentials(
  prevState: unknown,
  formData: FormData,
) {
  try {
    const user = signInFormSchema.parse({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    await signIn("credentials", user);
    return { success: true, message: "Signed in successfully" };
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }
    return { success: false, message: " Invalid email or password" };
  }
}

//sign user out
export async function signOutUser() {
  await signOut();
}

export const createBooking = async (bookingData: BookingData) => {
  const response = await axios.post("/api/bookings", bookingData);
  return response.data;
};

export const getBookings = async () => {
  const response = await axios.get("/api/bookings");
  return response.data;
};

export const addToWishlist = async (wishlistData: WishlistData) => {
  const response = await axios.post("/api/wishlist", wishlistData);
  return response.data;
};

export const getWishlist = async () => {
  const response = await axios.get("/api/wishlist");
  return response.data;
};

export const removeFromWishlist = async (id: string) => {
  const response = await axios.delete(`/api/wishlist?id=${id}`);
  return response.data;
};
