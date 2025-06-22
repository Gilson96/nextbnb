import { PlacesType } from "@/lib/actions/place.actions";
import { ChevronRightIcon } from "lucide-react";
import Link from "next/link";
import { Dispatch, SetStateAction } from "react";

type HeaderDropdownProps = {
  places: PlacesType[];
  setOpenInput: Dispatch<SetStateAction<boolean>>;
};
export const TabPlaces = ({ places, setOpenInput }: HeaderDropdownProps) => {
  return (
    <>
      {places?.map((place) => (
        <Link
          key={place.id}
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
    </>
  );
};
