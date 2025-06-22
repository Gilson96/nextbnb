"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

const PlaceHeader = () => {
  const router = useRouter();

  return (
    <div className="flex h-[5rem] w-full items-center justify-between border-b p-[2%] shadow">
      <button
        onClick={() => router.back()}
        aria-label="Go Back"
        className="rounded-full p-2 hover:bg-neutral-200"
      >
        <ArrowLeft />
      </button>
      <div></div>
    </div>
  );
};

export default PlaceHeader;
