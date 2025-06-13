import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import Link from "next/link";
import { ChevronRightIcon } from "lucide-react";
import { PlacesType, RoomsType } from "@/lib/actions/place.actions";
import { Dispatch, SetStateAction } from "react";

type HeaderDropdownProps = {
  places: PlacesType[];
  rooms: RoomsType[];
  setOpenInput: Dispatch<SetStateAction<boolean>>
};

const HeaderDropdown = ({ places, rooms, setOpenInput }: HeaderDropdownProps) => {
  return (
    <Tabs defaultValue="places" className="w-full text-black">
      <TabsList className="w-full">
        <TabsTrigger value="places">Places</TabsTrigger>
        <TabsTrigger value="rooms">Rooms</TabsTrigger>
      </TabsList>
      <TabsContent
        value="places"
        className="grid h-[7rem] grid-cols-2 gap-3 text-left"
      >
        {places?.map((place, index) => (
          <Link
            key={index}
            className=""
            href={`/place/${place.placeName}/all/all`}
            onClick={() => setOpenInput(false)}
          >
            <p className="text-base underline">{place.placeName}</p>
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
      </TabsContent>
      <TabsContent
        value="rooms"
        className="flex flex-col items-start justify-start gap-3"
      >
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
      </TabsContent>
    </Tabs>
  );
};

export default HeaderDropdown;
