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
    <div className="flex flex-col gap-4">
      <button
        onClick={handleBack}
        className="mb-2 self-start text-blue-500 underline"
      >
        ← Back to list
      </button>

      {/* Gallery */}
      <Carousel className="relative mx-auto w-full max-w-lg">
        <CarouselContent>
          {findRoomImages.map((image, index) =>
            image.imageUrl.map((img) => (
              <CarouselItem key={index} className="flex justify-center">
                <div className="relative h-[200px] w-full overflow-hidden rounded-xl sm:h-[250px] sm:w-[400px] md:h-[300px] md:w-[500px] lg:h-[350px] lg:w-[600px]">
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
        <CarouselPrevious className="top-1/2 -left-4 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 shadow backdrop-blur-sm" />
        <CarouselNext className="top-1/2 -right-4 h-8 w-8 -translate-y-1/2 rounded-full bg-white/80 shadow backdrop-blur-sm" />
      </Carousel>

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
