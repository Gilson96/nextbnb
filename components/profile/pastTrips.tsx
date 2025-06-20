import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import {
  GalleryTypes,
  HostsTypes,
  RoomsType,
} from "@/lib/actions/place.actions";
import { BookingTypes } from "@/lib/actions/users.actions";
import { useStore } from "@/store";
import Image from "next/image";
import Link from "next/link";

type PastTripsProps = {
  bookingId: string;
  bookings: BookingTypes[];
  rooms: RoomsType[];
  gallery: GalleryTypes[];
  handleBack: () => void;
  hosts: HostsTypes[];
};

const PastTrips = ({
  bookingId,
  bookings,
  rooms,
  gallery,
  handleBack,
  hosts,
}: PastTripsProps) => {
  const booking = bookings.find((booking) => booking.id === bookingId);
  if (!booking) return <p>Booking not found</p>;

  const findRoom = rooms.find((room) => room.id === booking.roomId);
  const findRoomImages = gallery.filter(
    (image) => image.roomId === findRoom?.id,
  );
  const findHost = hosts.find((host) => host.id === findRoom?.hostId);

  return (
    <div className="flex max-h-[25rem] flex-col gap-4 overflow-hidden overflow-y-auto">
      <button
        onClick={handleBack}
        className="mb-2 self-start text-blue-500 underline"
      >
        ← Back to list
      </button>

      {/* Gallery */}
      <div className="flex w-full justify-center">
        <div className="w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[420px]">
          <Carousel className="w-full">
            <CarouselContent>
              {findRoomImages.map((imageSet, index) =>
                imageSet.imageUrl.map((img, imgIndex) => (
                  <CarouselItem
                    key={`${index}-${imgIndex}`}
                    className="flex justify-center"
                  >
                    <div className="relative h-[250px] w-full overflow-hidden rounded-xl sm:h-[300px] md:h-[350px] lg:h-[400px]">
                      <Image
                        src={img}
                        alt={`Room image ${index + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                )),
              )}
            </CarouselContent>
            <CarouselPrevious className="top-1/2 -left-4 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 shadow backdrop-blur-sm" />
            <CarouselNext className="top-1/2 -right-4 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 shadow backdrop-blur-sm" />
          </Carousel>
        </div>
      </div>

      {/* Room Details */}
      <div className="flex flex-col items-start">
        <p className="mb-2 text-xl font-bold">{findRoom?.roomDescription}</p>
        <p>
          <span className="font-bold">Location:</span> {findRoom?.roomLocation}
        </p>
        <p>
          <span className="font-bold">Price:</span> £{findRoom?.roomPrice}
        </p>
        <p>
          <span className="font-bold">Type:</span> {findRoom?.roomType}
        </p>
        <p>
          <span className="font-bold">Booking Date:</span>{" "}
          {booking.startDate.toDateString().slice(3)} -{" "}
          {booking.endDate.toDateString().slice(3)}
        </p>
        <p>
          <span className="font-bold">Total cost:</span> £
          {booking.payementAmount.toFixed(2)}
        </p>
        <p>
          <span className="font-bold">Hosted by:</span> {findHost?.hostName}
        </p>
        <Link
          href={`/room/${findRoom?.id}`}
          className="text-blue-500 underline"
        >
          See room
        </Link>
      </div>
    </div>
  );
};

export default PastTrips;
