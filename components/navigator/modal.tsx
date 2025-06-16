"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { PlacesType, RoomsType } from "@/lib/actions/place.actions";
import { Dispatch, SetStateAction, useState } from "react";
import {
  FilterLocation,
  FilterPrice,
  FilterType,
} from "../navigator/filtersSetup";
import { Button } from "../ui/button";
import { TabPlaces } from "./tabPlaces";
import { TabRooms } from "./tabRooms";

type ModalProps = {
  places: PlacesType[];
  rooms: RoomsType[];
  setOpenInput: Dispatch<SetStateAction<boolean>>;
};

const Modal = ({ places, rooms, setOpenInput }: ModalProps) => {
  const [location, setLocation] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [price, setPrice] = useState<string>("all");
  return (
    <Tabs defaultValue="places" className="w-full text-black">
      <TabsList className="w-full">
        <TabsTrigger value="places" className="cursor-pointer">
          Places
        </TabsTrigger>
        <TabsTrigger value="rooms" className="cursor-pointer">
          Rooms
        </TabsTrigger>
        <TabsTrigger className="cursor-pointer max-md:hidden" value="filters">
          Filters
        </TabsTrigger>
      </TabsList>
      <TabsContent
        value="places"
        className="grid h-[7rem] grid-cols-2 gap-3 text-left"
      >
        <TabPlaces places={places} setOpenInput={setOpenInput} />
      </TabsContent>
      <TabsContent
        value="rooms"
        className="flex flex-col items-start justify-start gap-3"
      >
        <TabRooms rooms={rooms} setOpenInput={setOpenInput} />
      </TabsContent>
      <TabsContent
        value="filters"
        className="flex flex-col items-start justify-start gap-3"
      >
        <FilterLocation places={places!} setLocation={setLocation} />
        <hr className="h-[1px] w-full bg-neutral-300" />
        <FilterType setType={setType} />
        <hr className="h-[1px] w-full bg-neutral-300" />
        <FilterPrice setPrice={setPrice} />
        <Link href={`/place/${location}/${type}/${price}`}>
          <Button className="cursor-pointer">Confirm</Button>
        </Link>
      </TabsContent>
    </Tabs>
  );
};

export default Modal;
