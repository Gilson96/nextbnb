import { Star } from "lucide-react";
import { Button } from "@/components/ui/button";

type RequestBookProps = {
  roomDescription: string;
  roomRating: number;
  hostName: string
};

const RequestBook = ({ roomDescription, roomRating, hostName }: RequestBookProps) => {
  return (
    <section className="flex w-full flex-col items-center justify-center rounded-2xl border p-[2%] shadow">
      {/* header */}
      <div className="flex w-full p-[3%] items-center justify-between">
        <div className="h-[7rem] w-[7rem] rounded-2xl bg-neutral-500"></div>
        <div className="flex flex-col gap-1">
          <p className="font-bold text-lg">{roomDescription}</p>
          <div className="flex gap-0.5">
            <Star size={20} fill="black" />
            <p className="font-bold">{roomRating}</p>
          </div>
          <p>Host: {hostName}</p>
        </div>
      </div>
      <hr className="my-[2%] h-[1px] w-full bg-neutral-300" />
      {/* booking details */}
      <div className="flex w-full p-[3%] justify-between">
        <div className="flex flex-col">
          <p className="font-bold">Trip details</p>
          <p>10-12 Apr 2026</p>
          <p>1 adult</p>
        </div>
        <Button className="rounded-2xl text-black text-base bg-neutral-300 py-[6%] px-[4%]">Change</Button>
      </div>
    </section>
  );
};

export default RequestBook;
