import Header from "@/components/home/header";
import RoomsList from "@/components/home/roomsList";
import { getPlaces, getRooms } from "@/lib/actions/place.actions";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const rooms = await getRooms()
  const places = await getPlaces()
  
  return (
    <main className="w-full bg-white">
      <div className="mb-[5%] flex w-full items-center justify-center p-[2%]">
        <Header />
      </div>
      {places.map((place, index) => (
        <div key={index} className="flex flex-col p-[2%]">
          <Link
            href={`/place/${place.placeName}`}
            className="flex items-center"
          >
            <p className="text-lg font-bold">
              Popular homes in {place.placeName}
            </p>
            <ChevronRight size={20} />
          </Link>
          <div className="flex overflow-hidden overflow-x-auto py-[3%]">
            {rooms.filter(room => room.roomLocation === place.placeName).map((room) => (
              <div className="py-[2%] pr-[5%]">
                <RoomsList
                  placeName={place.placeName!}
                  roomId={room.id}
                  roomPrice={room.roomPrice}
                  roomRating={Number(room.roomRating)}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </main>
  );
}
