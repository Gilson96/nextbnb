import Header from "@/components/home/header";
import RoomsList from "@/components/home/roomsList";
import {
  getPlaces,
  getBoltonRooms,
  getOldHamRooms,
  getSalfordRooms,
  getStockportRooms,
} from "@/lib/actions/place.actions";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const places = await getPlaces();
  const oldHamRooms = await getOldHamRooms();
  const salfordRooms = await getSalfordRooms();
  const boltonRooms = await getBoltonRooms();
  const stockportRooms = await getStockportRooms();

  const allFilteredRooms = [
    boltonRooms,
    oldHamRooms,
    salfordRooms,
    stockportRooms,
  ];

  return (
    <main className="w-full bg-white">
      <div className="w-full p-[2%] mb-[5%] flex justify-center items-center">
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
            {allFilteredRooms[index].map((room) => (
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
