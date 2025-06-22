"use client";
import { APIProvider, Map, Marker } from "@vis.gl/react-google-maps";

type MapsProps = {
  findRoom?: {
    lat: number;
    lon: number;
  };
  placeName: string;
};

const Maps = ({ findRoom, placeName }: MapsProps) => {
  if (!findRoom || findRoom.lat === undefined || findRoom.lon === undefined) {
    return (
      <p className="my-[5%] text-center text-red-600">
        Location data is unavailable.
      </p>
    );
  }

  return (
    <section
      aria-label="Map location"
      className="my-[5%] flex w-full flex-col gap-1 md:my-0 md:w-full md:p-[2%]"
    >
      <h2 className="my-[3%] text-xl font-bold md:mb-1">Where you'll be</h2>
      <p className="my-[3%] text-neutral-500 md:my-2">
        {placeName}, England, United Kingdom
      </p>
      <APIProvider
        apiKey={process.env.GOOGLE_MAPS_API_KEY ?? ""}
        onLoad={() => console.log("Maps API has loaded.")}
      >
        {/* Mobile map */}
        <div className="md:hidden">
          <Map
            style={{ width: "100%", height: "20rem" }}
            defaultCenter={{ lat: findRoom.lat, lng: findRoom.lon }}
            defaultZoom={12}
            gestureHandling="cooperative"
            disableDefaultUI
          >
            <Marker position={{ lat: findRoom.lat, lng: findRoom.lon }} />
          </Map>
        </div>

        {/* Desktop map */}
        <div className="hidden md:block">
          <Map
            style={{ width: "100%", height: "40rem" }}
            defaultCenter={{ lat: findRoom.lat, lng: findRoom.lon }}
            defaultZoom={12}
            gestureHandling="cooperative"
            disableDefaultUI
          >
            <Marker position={{ lat: findRoom.lat, lng: findRoom.lon }} />
          </Map>
        </div>
      </APIProvider>
    </section>
  );
};

export default Maps;
