"use client";
import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useStore } from "@/store";
import { Textarea } from "../ui/textarea";

type RequestBookProps = {
  roomDescription: string;
  roomRating: number;
  hostName: string;
  roomImage: string;
};

const RequestBook = ({
  roomDescription,
  roomRating,
  roomImage,
  hostName,
}: RequestBookProps) => {
  const router = useRouter();
  const bookingDates = useStore((state) => state.bookingDates);

  const startDate = bookingDates.startDate?.toDateString().slice(8, 10);
  const endDate = bookingDates.endDate?.toDateString().slice(8, 10);
  const month = bookingDates.endDate?.toDateString().slice(4, 7);
  const year = bookingDates.endDate?.toDateString().slice(10, 15);
  const formatDate = `${startDate}-${endDate} ${month} ${year}`;

  return (
    <section className="flex w-full flex-col items-center ">
      <p className="my-[3%] w-full place-self-start text-2xl font-bold">
        Request to book
      </p>
      <div className="flex w-full flex-col items-center justify-center rounded-2xl border p-[2%] shadow">
        {/* header */}
        <div className="flex w-full items-center justify-between p-[3%]">
          <div
            style={{ backgroundImage: `url(${roomImage})` }}
            className="h-[7rem] w-[7rem] rounded-2xl bg-neutral-500 bg-cover bg-center bg-no-repeat"
          ></div>
          <div className="flex flex-col gap-1">
            <p className="text-lg font-bold">{roomDescription}</p>
            <div className="flex gap-0.5">
              <Star size={20} fill="black" />
              <p className="font-bold">{roomRating}</p>
            </div>
            <p>Host: {hostName}</p>
          </div>
        </div>
        <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
        {/* booking details */}
        <div className="flex w-full justify-between p-[3%]">
          <div className="flex flex-col">
            <p className="font-bold">Trip details</p>
            <p>{formatDate}</p>
            <p>1 adult</p>
          </div>
          <Button
            onClick={() => router.back()}
            className="rounded-2xl bg-neutral-300 px-[4%] py-[6%] text-base text-black"
          >
            Change
          </Button>
        </div>
        <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
        <div className="my-[2%] flex flex-col gap-2 p-[2%]">
          <p className="text-base">Write a message to the host</p>
          <p>
            Before you can continue, let {hostName} know a little about your
            trip and why their place is a good fit.
          </p>
          <Textarea placeholder="Type your message here." />
        </div>
      </div>
    </section>
  );
};

export default RequestBook;
