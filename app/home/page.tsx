import Navigator from "@/components/navigator/navigator";
import RoomsList from "@/components/home/roomsList";
import {
  GalleryTypes,
  getPlaces,
  getRoomGallery,
  getRooms,
  PlacesType,
  RoomsType,
} from "@/lib/actions/place.actions";
import { ChevronRight } from "lucide-react";
import Link from "next/link";
import Filters from "@/components/navigator/filters";
import { getServerSession } from "next-auth/next";
import { authConfig } from "@/auth";
import { redirect } from "next/navigation";

export default async function Home() {
  const rooms: RoomsType[] = await getRooms();
  const places: PlacesType[] = await getPlaces();
  const gallery: GalleryTypes[] = await getRoomGallery();
  const session = await getServerSession(authConfig);

  if (!session) {
    redirect("/");
  }
  
  return (
    <main className="w-full bg-white">
      <Navigator places={places} rooms={rooms} session={session} />
      <div className="flex w-full items-end justify-end p-[2%] lg:hidden">
        <Filters places={places} />
      </div>
      {places.map((place, i) => {
        return (
          <div key={i} className="flex flex-col p-[2%]">
            <Link
              href={`/place/${place.placeName}/all/all`}
              className="flex w-fit items-center pb-2"
            >
              <p className="text-lg font-bold">
                Popular homes in {place.placeName}
              </p>
              <ChevronRight size={20} />
            </Link>
            <div className="flex gap-5 py-[3%] max-xl:overflow-hidden max-xl:overflow-x-auto md:w-full xl:py-0">
              {rooms
                .filter((room) => room.roomLocation === place.placeName)
                .map((room, index) => (
                  <RoomsList
                    roomDescription={room.roomDescription}
                    roomId={room.id}
                    roomPrice={room.roomPrice}
                    roomRating={Number(room.roomRating)}
                    roomImage={gallery[index].imageUrl.at(i - 3)!}
                  />
                ))}
            </div>
          </div>
        );
      })}
    </main>
  );
}
