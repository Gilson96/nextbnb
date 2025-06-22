import { getRoomGallery } from "@/lib/actions/place.actions";
import { Star } from "lucide-react";
import Link from "next/link";

type RoomListProps = {
  roomDescription: string;
  roomRating: number;
  hostName: string;
  hostingYears: number;
  roomType: string;
  roomPrice: number;
  id: string;
};

const RoomList = async ({
  roomDescription,
  roomRating,
  roomPrice,
  roomType,
  hostName,
  id,
  hostingYears,
}: RoomListProps) => {
  const gallery = await getRoomGallery();
  const randomNumber = Math.floor(Math.random() * 3);
  const roomImages = gallery.find((image) => image.roomId === id)?.imageUrl;
  const findRoomImage = roomImages?.[randomNumber] || "/fallback.jpg";

  return (
    <Link href={`/room/${id}`}>
      <div className="flex w-full cursor-pointer flex-col">
        <div
          style={{ backgroundImage: `url(${findRoomImage})` }}
          className="h-[15rem] w-[20rem] rounded-2xl bg-neutral-400 bg-cover bg-center bg-no-repeat"
        ></div>

        <div className="flex w-full flex-col px-0.5 py-[2%]">
          <div className="flex items-center justify-between">
            <p className="truncate font-bold" title={roomDescription}>
              {roomDescription}
            </p>
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
