"use client";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
  Marker,
} from "@vis.gl/react-google-maps";
import { House } from "lucide-react";

type MapsProps = {
  findRoom?: {
    lat: number;
    lon: number;
  };
  placeName: string;
};

const Maps = ({ findRoom, placeName }: MapsProps) => {
  return (
    <div className="my-[5%] flex w-full flex-col gap-1 md:my-0 md:w-full md:p-[2%]">
      <p className="my-[3%] text-xl font-bold md:mb-1">Where you'll be</p>
      <p className="my-[3%] text-neutral-500 md:my-2">
        {placeName}, England, United kigdom
      </p>
      <APIProvider
        apiKey={`${process.env.GOOGLE_MAPS_API_KEY}`}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <div className="md:hidden">
          <Map
            style={{ width: "100%", height: "20rem" }}
            defaultCenter={{ lat: findRoom?.lat!, lng: findRoom?.lon! }}
            defaultZoom={12}
            gestureHandling={"cooperative"}
            disableDefaultUI={true}
          >
            <Marker position={{ lat: findRoom?.lat!, lng: findRoom?.lon! }} />
          </Map>
        </div>
        <div className="max-md:hidden">
          <Map
            style={{ width: "100%", height: "40rem" }}
            defaultCenter={{ lat: findRoom?.lat!, lng: findRoom?.lon! }}
            defaultZoom={12}
            gestureHandling={"cooperative"}
            disableDefaultUI={true}
          >
            <Marker position={{ lat: findRoom?.lat!, lng: findRoom?.lon! }} />
          </Map>
        </div>
      </APIProvider>
    </div>
  );
};

export default Maps;
