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
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Link from "next/link";

type FiltersProps = {
  places: { id: string; placeName: string }[];
};

const FiltersSetup = ({ places }: FiltersProps) => {
  const [location, setLocation] = useState<string>("all");
  const [type, setType] = useState<string>("all");
  const [price, setPrice] = useState<string>("all");

  const newPlaces = [{ id: "1", placeName: "all" }, ...places];

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <SlidersHorizontal />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="flex items-center justify-between">
            <p></p>
            <p className="font-bold">Filters</p>
            <X />
          </AlertDialogTitle>
          <hr className="h-[1px] w-full bg-neutral-300" />
        </AlertDialogHeader>
        <AlertDialogDescription>
          <p>Location</p>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              {newPlaces.map((place, index) => (
                <TabsTrigger
                  key={index}
                  onClick={() => setLocation(place.placeName)}
                  value={place.placeName}
                >
                  <p className="capitalize">{place.placeName}</p>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </AlertDialogDescription>
        <hr className="h-[1px] w-full bg-neutral-300" />
        <AlertDialogDescription>
          <p>Type of place</p>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">
                All
              </TabsTrigger>
              <TabsTrigger value="room" onClick={() => setType("room")}>
                Room
              </TabsTrigger>
              <TabsTrigger value="entire" onClick={() => setType("entire")}>
                Entire place
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </AlertDialogDescription>
        <hr className="h-[1px] w-full bg-neutral-300" />
        <AlertDialogDescription>
          <p>Price</p>
          <Tabs defaultValue="all" className="w-full">
            <TabsList>
              <TabsTrigger value="all">
                All
              </TabsTrigger>
              <TabsTrigger value="high" onClick={() => setPrice("high")}>
                Highest to Low
              </TabsTrigger>
              <TabsTrigger value="low" onClick={() => setPrice("low")}>
                Low to Highest
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Link href={`/place/${location}/${type}/${price}`}>
            <AlertDialogAction>Confirm</AlertDialogAction>
          </Link>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FiltersSetup;
