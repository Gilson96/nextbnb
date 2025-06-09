import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

type RoomsListProps = {
  placeName: string;
  roomId: number;
  roomPrice: number;
  roomRating: number;
};

const RoomsList = ({ placeName, roomId, roomPrice, roomRating }: RoomsListProps) => {
  return (
    <Link href={`room/${roomId}`}>
      <div>
        <div className="flex h-[7rem] w-[7rem] justify-end rounded-2xl bg-neutral-400 p-[6%]">
          <FaRegHeart />
        </div>
        <div className="text-sm">
          <p className="font-medium">Room in {placeName}</p>
          <div className="flex items-center gap-1 text-neutral-500">
            <p>£{roomPrice}/night</p>
            <span className="text-neutral-500">&#183;</span>
            <div className="flex items-center gap-1">
              <FaStar />
              <p>{roomRating}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RoomsList;
