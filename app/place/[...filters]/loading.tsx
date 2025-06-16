import { SlidersHorizontal, Star } from "lucide-react";

const Loading = () => {
  return (
    <main className="flex w-full flex-col items-center justify-center gap-2">
      <div className="flex h-[5rem] w-full items-center justify-between border-b p-[2%] shadow">
        <div className="flex items-start text-xl max-[425px]:hidden">
          <p className="font-bold">Next</p>
          <p className="font-bold text-cyan-500">bnb</p>
        </div>
      </div>
      <i className="flex w-full justify-end pr-[5%] pb-[7%]">
        <SlidersHorizontal />
      </i>
      <div className="flex flex-col gap-2">
        <div className="animate h-[15rem] w-[20rem] animate-pulse rounded-2xl bg-neutral-300"></div>
        <div className="flex w-full flex-col px-0.5 py-[2%]">
          <div className="flex items-center justify-between">
            <p className="animate h-[1rem] w-[40%] animate-pulse bg-neutral-300 font-bold text-neutral-300">
              s
            </p>
            <div className="flex items-center gap-1">
              <Star size={15} fill="black" />
              <p className="animate h-[1rem] w-[40%] animate-pulse bg-neutral-300 font-bold text-neutral-300">
                s
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="h-[15rem] w-[20rem] animate-pulse rounded-2xl bg-neutral-300"></div>
        <div className="flex w-full flex-col px-0.5 py-[2%]">
          <div className="flex items-center justify-between">
            <p className="h-[1rem] w-[40%] animate-pulse bg-neutral-300 font-bold text-neutral-300">
              s
            </p>
            <div className="flex items-center gap-1">
              <Star size={15} fill="black" />
              <p className="h-[1rem] w-[40%] animate-pulse bg-neutral-300 font-bold text-neutral-300">
                s
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Loading;
