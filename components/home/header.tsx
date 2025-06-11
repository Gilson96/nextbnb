"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AlignJustify, ChevronRightIcon } from "lucide-react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import Link from "next/link";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { HostsTypes, PlacesType, RoomsType } from "@/lib/actions/place.actions";

type HeaderProps = {
  places: PlacesType[];
  rooms: RoomsType[];
  hosts: HostsTypes[];
};

export default function Header({ places, rooms, hosts }: HeaderProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <div className="mb-[5%] flex h-[5rem] w-full items-center justify-between border-b p-[2%] shadow">
      <Link href={"/"} className="flex items-start text-xl">
        <p className="font-bold">Next</p>
        <p className="font-bold text-cyan-500">bnb</p>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger className="flex h-[3rem] items-center justify-center gap-2 rounded-full border px-[10%] py-[2%] shadow">
          <FaMagnifyingGlass />
          <p>Start your search</p>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-full p-[2%]">
          <Tabs defaultValue="places" className="mr-[2rem] w-[400px]">
            <DropdownMenuLabel>
              <TabsList className="w-full">
                <TabsTrigger value="places">Places</TabsTrigger>
                <TabsTrigger value="rooms">Rooms</TabsTrigger>
                <TabsTrigger value="hosts">Hosts</TabsTrigger>
              </TabsList>
            </DropdownMenuLabel>
            <DropdownMenuItem>
              <TabsContent
                value="places"
                className="grid h-[7rem] grid-cols-2 gap-3"
              >
                {places?.map((place, index) => (
                  <Link
                    key={index}
                    className=""
                    href={`/place/${place.placeName}/all/all`}
                  >
                    <p className="text-base underline">{place.placeName}</p>
                  </Link>
                ))}
                <div className="flex w-full items-center">
                  <p>see all</p>
                  <ChevronRightIcon />
                </div>
              </TabsContent>
              <TabsContent value="rooms">
                {rooms?.slice(0, 3).map((room, index) => (
                  <div className="flex w-full items-center justify-between gap-2 overflow-hidden p-[2%]">
                    <p></p>
                  </div>
                ))}
              </TabsContent>
            </DropdownMenuItem>
          </Tabs>
          {/* <DropdownMenuSeparator /> */}
        </DropdownMenuContent>
      </DropdownMenu>
      <i>
        <AlignJustify />
      </i>
    </div>
  );
}
