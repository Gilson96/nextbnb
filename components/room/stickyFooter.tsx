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
  const daysQuantity = Math.abs(
    (bookingDates.endDate === undefined
      ? roomPrice
      : bookingDates.endDate.getDate()!) -
      (bookingDates.startDate === undefined
        ? roomPrice
        : bookingDates.startDate.getDate()!),
  );
  const { isInWishlist, toggleWishlist, loading } = useWishlist(
    session?.user.id,
  );

  const handleInvalidReservation = () => {
    toast.error("Please select valid booking dates", {
      position: "top-center",
    });
  };

  return (
    <div className="flex h-[15rem] w-[20rem] flex-col items-start justify-between rounded-2xl border bg-white p-[3%] text-xl shadow">
      <div className="flex w-full flex-col gap-4">
        <div className="flex gap-0.5 text-2xl underline">
          <p className="font-bold">£{roomPrice}</p>
          <p>/night</p>
        </div>
        <div className="flex w-full justify-between">
          <div className="flex gap-1">
            <p>£{roomPrice}</p>
            <p>x</p>
            <p>{daysQuantity === 0 ? 1 : daysQuantity} nights</p>
          </div>
          <p>£{price === 0 ? roomPrice.toFixed(2) : price.toFixed(2)}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <button
          className="cursor-pointer"
          onClick={() => toggleWishlist(room.id)}
          disabled={loading}
        >
          <Heart fill={isInWishlist(room.id) ? "black" : "none"} />
        </button>
        <p>Wishlist</p>
      </div>
      <hr className="h-[0.5px] w-full bg-neutral-300" />
      {daysQuantity <= 0 ? (
        <Button
          onClick={handleInvalidReservation}
          className="h-[3rem] w-[8rem] cursor-pointer rounded-full bg-linear-to-r from-cyan-500 to-blue-500 font-bold text-white shadow"
        >
          Reserve
        </Button>
      ) : (
        <Link
          onClick={() =>
            addToCart({
              totalPrice: price,
              room,
              host,
              image: roomImage,
              session,
            })
          }
          href={"/checkout"}
          className="flex h-[3rem] w-[8rem] cursor-pointer items-center justify-center rounded-full bg-linear-to-r from-cyan-500 to-blue-500 font-bold text-white shadow"
        >
          Reserve
        </Link>
      )}
    </div>
  );
};
