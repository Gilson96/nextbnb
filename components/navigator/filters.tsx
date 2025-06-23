"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { SlidersHorizontal, X } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { FilterLocation, FilterPrice, FilterType } from "./filtersSetup";

type FiltersProps = {
  places: { id: string; placeName: string }[];
};

const Filters = ({ places }: FiltersProps) => {
  const [location, setLocation] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [price, setPrice] = useState<string>("all");

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <SlidersHorizontal className="cursor-pointer" />
      </AlertDialogTrigger>
      <AlertDialogContent className="max-w-full overflow-x-hidden">
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <p></p>
            <p className="font-bold">Filters</p>
            <AlertDialogCancel className="cursor-pointer border-0 shadow-none">
              <X />
            </AlertDialogCancel>
          </AlertDialogTitle>
          <hr className="h-[1px] w-full bg-neutral-300" />
        </AlertDialogHeader>

        <AlertDialogDescription>
          <FilterLocation places={places} setLocation={setLocation} />
        </AlertDialogDescription>

        <hr className="h-[1px] w-full bg-neutral-300" />

        <AlertDialogDescription>
          <FilterType setType={setType} />
        </AlertDialogDescription>

        <hr className="h-[1px] w-full bg-neutral-300" />

        <AlertDialogDescription>
          <FilterPrice setPrice={setPrice} />
        </AlertDialogDescription>

        <AlertDialogFooter>
          <div className="flex justify-between pr-[5%]">
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <Link href={`/place/${location}/${type}/${price}`}>
              <AlertDialogAction className="cursor-pointer bg-cyan-500">
                Confirm
              </AlertDialogAction>
            </Link>
          </div>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Filters;
