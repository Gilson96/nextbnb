"use client";
import { ArrowLeft } from "lucide-react";
import Navigator from "../navigator/navigator";
import { useRouter } from "next/navigation";

const PlaceHeader = () => {
  const router = useRouter();
  return (
    <div className="flex h-[5rem] w-full items-center justify-between border-b p-[2%] shadow">
      <p onClick={() => router.back()}>
        <ArrowLeft />
      </p>
      {/* <Navigator /> */}
      <div></div>
    </div>
  );
};

export default PlaceHeader;
