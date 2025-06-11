import Filters from "@/components/home/filters";
import Header from "@/components/home/header";
import RoomsList from "@/components/home/roomsList";
import {
  GalleryTypes,
  getHosts,
  getPlaces,
  getRoomGallery,
  getRooms,
  HostsTypes,
  PlacesType,
  RoomsType,
} from "@/lib/actions/place.actions";
import { ChevronRight } from "lucide-react";
import Link from "next/link";

export default async function Home() {
  const oldRooms: RoomsType[] = await getRooms();
  const places: PlacesType[] = await getPlaces();
  const gallery: GalleryTypes[] = await getRoomGallery();
  const hosts: HostsTypes[] = await getHosts();

  // Convert Decimal to number
  // Fix prisma Decimal data type
  // it loops and cast
  const rooms = oldRooms.map((room) => ({
    ...room,
    roomRating: Number(room.roomRating),
    roomLongitude: Number(room.roomLongitude),
    roomLatitude: Number(room.roomLatitude)
  }));

  const findImage = (roomId: string) => {
    return gallery.filter((image) => image.roomId === roomId);
  };

  return (
    <main className="w-full bg-white">
      <Header places={places} hosts={hosts} rooms={rooms} />
      <Filters places={places} />
      {places.map((place, i) => (
        <div key={i} className="flex flex-col p-[2%]">
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
            {rooms
              .filter((room) => room.roomLocation === place.placeName)
              .map((room, index) => (
                <div key={index} className="py-[2%] pr-[5%]">
                  <RoomsList
                    placeName={place.placeName!}
                    roomId={room.id}
                    roomPrice={room.roomPrice}
                    roomRating={Number(room.roomRating)}
                    roomImage={findImage(room.id)[0].imageUrl.at(i + -1)!}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </main>
  );
}
