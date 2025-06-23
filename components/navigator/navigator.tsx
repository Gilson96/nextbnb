"use client";
import { House, X } from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import { PlacesType, RoomsType } from "@/lib/actions/place.actions";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Account from "./account";
import Search from "./search";
import Modal from "./modal";
import { Session } from "next-auth";

type NavigatorProps = {
  places?: PlacesType[];
  rooms?: RoomsType[];
  session?: Session | null | undefined;
};

export default function Navigator({ places, rooms, session }: NavigatorProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [openInput, setOpenInput] = useState<boolean>(false);
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };
  // adds 'type' property 'as const'
  // to typescript understands which one is the one be call
  // in order to access each array's property
  // Discrimination union
  const searchPool = [
    ...(places || []).map((place) => ({ ...place, type: "place" as const })),
    ...(rooms || []).map((room) => ({ ...room, type: "room" as const })),
  ];

  const searchPlacesOrRooms = searchPool.filter((search) => {
    const trimmedInput = inputValue.trim().toLocaleLowerCase();

    if (search.type === "place") {
      return search.placeName.toLocaleLowerCase().includes(trimmedInput);
    } else if (search.type === "room") {
      return search.roomDescription.toLocaleLowerCase().includes(trimmedInput);
    }
  });

  return (
    <div className="flex h-[5rem] w-full items-center justify-between border-b p-[2%] shadow">
      <Link
        href={"/home"}
        className="flex items-start text-xl max-md:text-lg"
      >
        <p className="font-bold">Next</p>
        <p className="font-bold text-cyan-500">bnb</p>
      </Link>
      <p className="min-[425px]:hidden"></p>
      <AlertDialog open={openInput} onOpenChange={setOpenInput}>
        <AlertDialogTrigger className="flex h-[3rem] cursor-pointer items-center justify-center gap-2 rounded-full border px-[10%] py-[2%] shadow">
          <FaMagnifyingGlass />
          <p>Start your search</p>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex w-full items-center justify-between gap-2">
              <input
                type="text"
                onChange={handleSearchInput}
                value={inputValue}
                placeholder="rooms, locations..."
                className="flex h-[3rem] w-full items-center justify-center gap-2 rounded-full border p-[3%] italic shadow"
              />
              <AlertDialogCancel className="cursor-pointer border-0 shadow-none">
                <X />
              </AlertDialogCancel>
            </AlertDialogTitle>
            <AlertDialogDescription className="my-[2%] flex flex-col items-center justify-center">
              {inputValue.length === 0 ? (
                <Modal
                  setOpenInput={setOpenInput}
                  places={places!}
                  rooms={rooms!}
                />
              ) : (
                <Search
                  searchPlacesOrRooms={searchPlacesOrRooms}
                  setOpenInput={setOpenInput}
                />
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
      <Account session={session!} />
    </div>
  );
}
