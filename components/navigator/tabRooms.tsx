import { RoomsType } from "@/lib/actions/place.actions";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type HeaderDropdownProps = {
  rooms: RoomsType[];
  setOpenInput: Dispatch<SetStateAction<boolean>>;
};

export const TabRooms = ({ rooms, setOpenInput }: HeaderDropdownProps) => {
  return (
    <>
      {rooms?.slice(0, 3).map((room, index) => (
        <Link
          key={index}
          href={`/room/${room.id}`}
          className="text-base underline"
          onClick={() => setOpenInput(false)}
        >
          {room.roomDescription}
        </Link>
      ))}
      <div className="flex w-full items-center">
        <Link
          href={`/place/all/all/all`}
          onClick={() => setOpenInput(false)}
          className="text-neutral-500 underline"
        >
          see all
        </Link>
        <ChevronRightIcon color="#737373" />
      </div>
    </>
  );
};
