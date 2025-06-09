"use client";
import { ArrowLeft, Heart } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();

  return (
    <div className="flex h-[15rem] w-full justify-between bg-neutral-500 p-[2%]">
      <i
        onClick={() => router.back()}
        className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-neutral-300 shadow"
      >
        <ArrowLeft size={20} />
      </i>
      <i className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-neutral-300 shadow">
        <Heart size={20} />
      </i>
    </div>
  );
};

export default Header;
