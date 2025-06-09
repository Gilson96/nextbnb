import { getAmenities } from "@/lib/actions/place.actions";

type AmenitiesProps = {
  roomId: number;
};

const Amenities = async ({ roomId }: AmenitiesProps) => {
  const amenities = await getAmenities();

  const findAmenities = amenities.filter(
    (amenity) => amenity.roomId === roomId,
  );

  return (
    <div className="my-[5%] flex flex-col gap-1">
      <p className="text-xl font-bold">What this place offers</p>
      <div className="grid grid-cols-2 grid-rows-2 gap-2">
        {findAmenities?.map((amenity, index) => (
          <li className="flex">
            <ul key={index} className="underline">
              {amenity.amenityName}
            </ul>
          </li>
        ))}
      </div>
    </div>
  );
};

export default Amenities;
