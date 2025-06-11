import Header from "@/components/home/header";
import RoomList from "@/components/place/roomList";
import { SlidersHorizontal, Star } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex w-full flex-col items-center gap-2 justify-center">
      <Header />
      <i className="flex w-full justify-end pr-[5%] pb-[7%]">
        <SlidersHorizontal />
      </i>
      <div className="flex flex-col gap-2">
        <div className="h-[15rem] w-[20rem] animate animate-pulse rounded-2xl bg-neutral-300"></div>
        <div className="flex w-full flex-col px-0.5 py-[2%]">
          <div className="flex items-center justify-between">
            <p className="font-bold w-[40%] h-[1rem] animate animate-pulse text-neutral-300 bg-neutral-300">s</p>
            <div className="flex items-center gap-1">
              <Star size={15} fill="black" />
              <p className="font-bold w-[40%] h-[1rem] animate animate-pulse text-neutral-300 bg-neutral-300">s</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-[15rem] w-[20rem] animate-pulse rounded-2xl bg-neutral-300"></div>
        <div className="flex w-full flex-col px-0.5 py-[2%]">
          <div className="flex items-center justify-between">
            <p className="font-bold w-[40%] h-[1rem] animate-pulse text-neutral-300 bg-neutral-300">s</p>
            <div className="flex items-center gap-1">
              <Star size={15} fill="black" />
              <p className="font-bold w-[40%] h-[1rem] animate-pulse text-neutral-300 bg-neutral-300">s</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
