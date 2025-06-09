"use client";
import {
  APIProvider,
  Map,
  MapCameraChangedEvent,
} from "@vis.gl/react-google-maps";

type MapsProps = {
  findRoom?: {
    lat: number;
    lon: number;
  };
  placeName: string;
};

const Maps = ({ findRoom, placeName }: MapsProps) => {
  return (
    <div className="my-[5%] w-full flex flex-col gap-1">
      <p className="text-xl font-bold my-[3%]">Where you'll be</p>
      <p className="text-neutral-500 my-[3%]">{placeName}, England, United kigdom</p>
      <APIProvider
        apiKey={`${process.env.GOOGLE_MAPS_API_KEY}`}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        <Map
          style={{ width: "100%", height: "20rem" }}
          defaultCenter={{ lat: findRoom?.lat!, lng: findRoom?.lon! }}
          defaultZoom={12}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
        ></Map>
      </APIProvider>
    </div>
  );
};

export default Maps;
