import { create } from "zustand";
import { persist } from "zustand/middleware";
import { HostsTypes, RoomsType } from "./lib/actions/place.actions";
import axios from "axios";
import { Session } from "next-auth";

export type CartItem = {
  room: RoomsType;
  host: HostsTypes;
  totalPrice: number;
  image: string;
  session: Session | null
};
export type BookingDates = {
  startDate: Date | undefined;
  endDate: Date | undefined;
};

type Store = {
  cart: CartItem[];
  bookingDates: BookingDates;
  price: number;
  rooms: RoomsType[];
  addToCart: (item: CartItem) => void;
  setBookingDates: (dates: BookingDates) => void;
  setBookingPrice: (dates: BookingDates, roomPrice: number) => void;
  clearCart: () => void;
  addRoom: (newRoom: RoomsType[]) => Promise<void>;
};

export const useStore = create<Store>()(
  persist(
    (set) => ({
      cart: [],
      // replaces old cart items
      addToCart: (item) =>
        set((state) => {
          const filteredCart = state.cart.filter(
            (cartItem) => cartItem.room.id !== item.room.id,
          );
          return { cart: [...filteredCart, item] };
        }),
      bookingDates: { startDate: undefined, endDate: undefined },
      setBookingDates: (dates) => set({ bookingDates: dates }),
      price: 0,
      setBookingPrice: (dates, roomPrice) => {
        let newPrice = 0;

        if (dates.startDate && dates.endDate) {
          const oneDay = 1000 * 60 * 60 * 24;
          const diffInTime =
            dates.endDate.getTime() - dates.startDate.getTime();
          const howManyDays = Math.ceil(diffInTime / oneDay) || 1;

          newPrice = howManyDays * roomPrice;
        }

        set({
          bookingDates: dates,
          price: newPrice,
        });
      },
      clearCart: () =>
        set({
          cart: [],
          bookingDates: { startDate: undefined, endDate: undefined },
          price: 0,
        }),
      rooms: [],
      addRoom: async (newRoom) => {
        const response = await axios.post("/api/rooms", newRoom);
        set((state) => ({ rooms: [...state.rooms, response.data] }));
      },
    }),
    {
      name: "cart-storage", // LocalStorage key
      // Rehydrate Date objects from strings
      // this fix the error
      // bookingDates_startDate.toLocaleDateString is not a function
      // this happens because when data is persisted
      // the Date object becomes a string
      merge: (persistedState, currentState) => {
        const state = {
          ...currentState,
          ...(persistedState as Store),
        };

        if (state.bookingDates.startDate) {
          state.bookingDates.startDate = new Date(state.bookingDates.startDate);
        }
        if (state.bookingDates.endDate) {
          state.bookingDates.endDate = new Date(state.bookingDates.endDate);
        }

        return state;
      },
    },
  ),
);
