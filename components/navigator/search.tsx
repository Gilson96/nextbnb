import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type SearchProps = {
  searchPlacesOrRooms: (
    | {
        type: "place";
        id: string;
        placeName: string;
      }
    | {
        type: "room";
        id: string;
        roomDescription: string;
        roomType: string;
        roomRating: number;
        roomLatitude: number;
        roomLongitude: number;
        roomLocation: string;
        roomPrice: number;
        roomAbout: string;
        hostId: string;
      }
  )[];
  setOpenInput: Dispatch<SetStateAction<boolean>>;
};

const Search = ({
  searchPlacesOrRooms,
  setOpenInput,
}: SearchProps) => {
  return (
    <div className="flex h-[10rem] w-full flex-col items-start justify-start gap-2 overflow-hidden overflow-y-auto rounded-2xl border p-[3%] shadow">
      {/* Type Narrowing */}
      {searchPlacesOrRooms.map((search) => (
        <div
          onClick={() => setOpenInput(false)}
          className="text-base text-black underline"
        >
          {(search.type === "place" && (
            <Link href={`/place/${search.placeName}`}>{search.placeName}</Link>
          )) ||
            (search.type === "room" && (
              <Link href={`/room/${search.id}`}>{search.roomDescription}</Link>
            ))}
        </div>
      ))}
    </div>
  );
};

export default Search;
