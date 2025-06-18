"use client";
import { HostsTypes, RoomsType } from "@/lib/actions/place.actions";
import { useStore } from "@/store";
import Link from "next/link";
import { Button } from "../ui/button";
import { Session } from "next-auth";
import { toast } from "sonner";

export type FooterProps = {
  room: RoomsType;
  host: HostsTypes;
  roomImage: string;
  roomPrice: number;
  session: Session | null;
};

const Footer = ({ room, host, roomImage, roomPrice, session }: FooterProps) => {
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

  const handleInvalidReservation = () => {
    toast.error("Please select valid booking dates", {
      position: "top-center",
    });
  };


  return (
    <>
      <div className="fixed bottom-0 z-50 flex h-[7rem] w-full items-center justify-between border-t-2 bg-white px-[7%] py-[3%] md:hidden">
        <div className="flex gap-0.5 underline">
          <p className="font-bold">£{price === 0 ? roomPrice : price}</p>
          <p>/night</p>
        </div>
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
            className="h-[3rem] w-[8rem] cursor-pointer rounded-full bg-linear-to-r from-cyan-500 to-blue-500 font-bold text-white shadow"
          >
            Reserve
          </Link>
        )}
      </div>
    </>
  );
};
export default Footer;
