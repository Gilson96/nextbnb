"use client";
import { ArrowLeft } from "lucide-react";
import Header from "../home/header";
import { useRouter } from "next/navigation";

const PlaceHeader = () => {
  const router = useRouter();
  return (
    <div className="flex h-[5rem] w-full items-center justify-between border-b p-[2%] shadow">
      <p onClick={() => router.back()}>
        <ArrowLeft />
      </p>
      <Header />
      <div></div>
    </div>
  );
};

export default PlaceHeader;
