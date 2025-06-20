"use client";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlacesType } from "@/lib/actions/place.actions";
import { Dispatch, SetStateAction, useState } from "react";

type FilterLocationProps = {
  places: PlacesType[];
  setLocation: Dispatch<SetStateAction<string>>;
};

export const FilterLocation = ({
  places,
  setLocation,
}: FilterLocationProps) => {
  const newPlaces = [{ id: "1", placeName: "all" }, ...places];
  return (
    <>  
      <p className="font-bold">Location</p>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          {newPlaces.map((place, index) => (
            <TabsTrigger
              key={index}
              onClick={() => setLocation(place.placeName)}
              value={place.placeName}
            >
              <p className="capitalize cursor-pointer">{place.placeName}</p>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
    </>
  );
};

type FilterTypeProps = {
  setType: Dispatch<SetStateAction<string>>;
};

export const FilterType = ({ setType }: FilterTypeProps) => {
  return (
    <>
      <p className="font-bold">Type of place</p>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="room" onClick={() => setType("room")}>
            <p className="cursor-pointer">Room</p>
          </TabsTrigger>
          <TabsTrigger value="entire" onClick={() => setType("entire")}>
            <p className="cursor-pointer">Entire place</p>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};
type FilterPriceProps = {
  setPrice: Dispatch<SetStateAction<string>>;
};

export const FilterPrice = ({ setPrice }: FilterPriceProps) => {
  return (
    <>
      <p className="font-bold">Price</p>
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          <TabsTrigger value="high" onClick={() => setPrice("high")}>
            <p className="cursor-pointer">Highest to Low</p>
          </TabsTrigger>
          <TabsTrigger value="low" onClick={() => setPrice("low")}>
            <p className="cursor-pointer">Low to Highest</p>
          </TabsTrigger>
        </TabsList>
      </Tabs>
    </>
  );
};
