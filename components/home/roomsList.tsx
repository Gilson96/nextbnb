import Link from "next/link";
import { FaStar } from "react-icons/fa";

type RoomsListProps = {
  roomDescription: string;
  roomId: string;
  roomPrice: number;
  roomRating: number;
  roomImage: string;
};

const RoomsList = ({
  roomDescription,
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
          className=" flex md:h-[13rem] md:w-[13rem] h-[10rem] w-[10rem] justify-end rounded-2xl bg-neutral-400 bg-cover bg-center bg-no-repeat p-[6%]"
        >
          {" "}
        </div>
        <div className="text-sm">
          <p className="font-bold mt-1">{roomDescription}</p>
          <div className="flex items-center gap-1 text-neutral-500">
            <p>£{roomPrice}/night</p>
            <span className="text-neutral-500">&#183;</span>
            <div className="flex items-center gap-0.5">
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
