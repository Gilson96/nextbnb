import { getRoomAmenities } from "@/lib/actions/place.actions";

type AmenitiesProps = {
  roomId: string;
};

const Amenities = async ({ roomId }: AmenitiesProps) => {
  const amenities = await getRoomAmenities();

  const findAmenities = amenities.filter(
    (amenity) => amenity.roomId === roomId,
  );

  return (
    <div className="my-[5%] w-full flex flex-col gap-1 md:my-0 md:p-[2%]">
      <p className="text-xl font-bold md:mb-[2%]">What this place offers</p>
      <div className="grid grid-cols-2 grid-rows-2 gap-2 md:w-[50%]">
        {findAmenities?.map((amenity, index) => (
          <li className="flex">
            <ul key={index} className="underline">
              {amenity.amenityName}
            </ul>
          </li>
        ))}
      </div>
      <hr className="h-[1px] w-full bg-neutral-300 mt-[5%] md:w-[48%]" />
    </div>
  );
};

export default Amenities;
