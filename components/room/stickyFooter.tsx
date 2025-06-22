"use client";

import { useStore } from "@/store";
import { FooterProps } from "./footer";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Link from "next/link";
import { Heart } from "lucide-react";
import { useWishlist } from "@/hooks/useWishlits";

export const StickyFooter = ({
  room,
  host,
  roomImage,
  roomPrice,
  session,
}: FooterProps) => {
  const price = useStore((state) => state.price);
  const addToCart = useStore((state) => state.addToCart);
  const bookingDates = useStore((state) => state.bookingDates);

  // Calculate number of days between startDate and endDate
  const daysQuantity =
    bookingDates.startDate && bookingDates.endDate
      ? Math.ceil(
          (bookingDates.endDate.getTime() - bookingDates.startDate.getTime()) /
            (1000 * 60 * 60 * 24),
        )
      : 0;

  const { isInWishlist, toggleWishlist, loading } = useWishlist(
    session?.user.id,
  );

  const handleInvalidReservation = () => {
    toast.error("Please select valid booking dates", {
      position: "top-center",
    });
  };

  // Total price fallback to roomPrice if no custom price in store
  const totalPrice = price > 0 ? price : roomPrice;

  return (
    <footer
      aria-label="Sticky reservation footer"
      className="flex h-[15rem] w-[20rem] flex-col items-start justify-between rounded-2xl border bg-white p-4 text-xl shadow"
    >
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-0.5 text-2xl underline">
          <p className="font-bold">£{roomPrice}</p>
          <p>/night</p>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex gap-1">
            <p>£{roomPrice}</p>
            <p>x</p>
            <p>
              {daysQuantity > 0 ? daysQuantity : 1} night
              {daysQuantity !== 1 ? "s" : ""}
            </p>
          </div>
          <p>£{totalPrice.toFixed(2)}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-pressed={isInWishlist(room.id)}
          onClick={() => toggleWishlist(room.id)}
          disabled={loading}
          className="focus:outline-none cursor-pointer"
          aria-label={
            isInWishlist(room.id) ? "Remove from wishlist" : "Add to wishlist"
          }
        >
          <Heart fill={isInWishlist(room.id) ? "black" : "none"} />
        </button>
        <p>Wishlist</p>
      </div>

      <hr className="h-[0.5px] w-full bg-neutral-300" />

      {daysQuantity <= 0 ? (
        <Button
          onClick={handleInvalidReservation}
          className="h-[3rem] w-[8rem] cursor-pointer rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-white shadow"
          aria-disabled="true"
        >
          Reserve
        </Button>
      ) : (
        <Link
          href="/checkout"
          onClick={() =>
            addToCart({
              totalPrice,
              room,
              host,
              image: roomImage,
              session,
            })
          }
          className="flex h-[3rem] w-[8rem] cursor-pointer items-center justify-center rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 font-bold text-white shadow"
          aria-label="Proceed to reservation checkout"
        >
          Reserve
        </Link>
      )}
    </footer>
  );
};
