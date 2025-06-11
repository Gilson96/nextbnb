import { roomTypes } from "@/db/data_pools";
import { getRoomGallery } from "@/lib/actions/place.actions";
import { HeartIcon, Star } from "lucide-react";
import Link from "next/link";

type RooomListProps = {
  roomDescription: string;
  roomRating: number;
  hostName: string;
  hostingYears: number;
  roomType: string;
  roomPrice: number;
  id: string
};

const RoomList = async ({
  roomDescription,
  roomRating,
  roomPrice,
  roomType,
  hostName,
  id,
  hostingYears,
}: RooomListProps) => {
  const gallery = await getRoomGallery()

  const randomNumber = Math.floor(Math.random() * 3);
  const findRoomImage = gallery.find(image => image.roomId === id)?.imageUrl.at(randomNumber)
  
  return (
    <Link href={`/room/${id}`}>
      <div className="flex w-full flex-col">
        <div 
        style={{backgroundImage: `url(${findRoomImage})`}}
        className="h-[15rem] w-[20rem] rounded-2xl bg-neutral-400 bg-no-repeat bg-cover bg-center">
        </div>
        <div className="flex w-full flex-col px-0.5 py-[2%]">
          <div className="flex items-center justify-between">
            <p className="font-bold">{roomDescription}</p>
            <div className="flex items-center gap-1">
              <Star size={15} fill="black" />
              <p>{roomRating}</p>
            </div>
          </div>

          <div className="flex items-center gap-0.5 text-sm">
            <p className="text-neutral-500">Stay with {hostName.slice(0, 7)}</p>
            <span className="text-neutral-500">&#183;</span>
            <p>Hosting for {hostingYears} years</p>
          </div>
          <p className="text-sm font-bold">{roomType}</p>
          <div className="flex items-center">
            <div className="flex underline">
              <p className="font-bold">£{roomPrice}</p>
              <p className="text-neutral-500">/night</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomList;
