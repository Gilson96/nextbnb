"use client";
import { HostsTypes, RoomsType } from "@/lib/actions/place.actions";
import { useStore } from "@/store";
import Link from "next/link";
import { Button } from "../ui/button";

type FooterProps = {
  room: RoomsType;
  host: HostsTypes;
  roomImage: string;
  roomPrice: number;
};

const Footer = ({ room, host, roomImage, roomPrice }: FooterProps) => {
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

  return (
    <>
      <div className="fixed bottom-0 z-50 flex h-[7rem] w-full items-center justify-between border-t-2 bg-white px-[7%] py-[3%] md:hidden">
        <div className="flex gap-0.5 underline">
          <p className="font-bold">£{price}</p>
          <p>/night</p>
        </div>
        <Link
          onClick={() =>
            addToCart({ totalPrice: price, room, host, image: roomImage })
          }
          href={"/checkout"}
        >
          <button className="h-[3rem] w-[8rem] rounded-full bg-linear-to-r from-cyan-500 to-blue-500 font-bold text-white shadow">
            Reserve
          </button>
        </Link>
      </div>
    </>
  );
};

export const stickyFooter = ({
  room,
  host,
  roomImage,
  roomPrice,
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
  return (
    <div className="h-full max-md:hidden">
      <div className="sticky top-4 left-[20rem] flex h-[15rem] w-[22rem] flex-col items-start justify-between rounded-2xl border bg-white p-[2%] text-xl shadow">
        <div className="flex w-full flex-col gap-2">
          <div className="flex gap-0.5 text-2xl underline">
            <p className="font-bold">£{price === 0 ? roomPrice : price}</p>
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
        <Link
          onClick={() =>
            addToCart({ totalPrice: price, room, host, image: roomImage })
          }
          href={"/checkout"}
          className="w-full"
        >
          <Button className="h-[3rem] w-full rounded-full bg-linear-to-r from-cyan-500 to-blue-500 text-xl font-bold text-white shadow">
            Reserve
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Footer;
