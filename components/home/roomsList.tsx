import Link from "next/link";
import { FaRegHeart } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

type RoomsListProps = {
  placeName: string;
  roomId: string;
  roomPrice: number;
  roomRating: number;
  roomImage: string;
};

const RoomsList = ({
  placeName,
  roomId,
  roomImage,
  roomPrice,
  roomRating,
}: RoomsListProps) => {
  return (
    <Link href={`room/${roomId}`}>
      <div>
        <div
          style={{ backgroundImage: `url(${roomImage})` }}
          className="flex h-[10rem] w-[10rem] justify-end rounded-2xl bg-neutral-400 bg-cover bg-center bg-no-repeat p-[6%]"
        >
          {" "}
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
