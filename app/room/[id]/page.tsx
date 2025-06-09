import Amenities from "@/components/room/amenities";
import BookingCalendar from "@/components/room/bookingCalendar";
import Header from "@/components/room/header";
import Host from "@/components/room/host";
import Maps from "@/components/room/map";
import Reviews from "@/components/room/reviews";
import { getHosts, getReviews, getRooms } from "@/lib/actions/place.actions";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";

const Room = async (props: { params: Promise<{ id: number }> }) => {
  const { id } = await props.params;
  const rooms = await getRooms();
  const hosts = await getHosts();

  const findRoom = rooms.find((room) => room.id === Number(id));
  const findHost = hosts.find((host) => host.id === findRoom?.hostId);

  const castRoomCoor = {
    lat: Number(findRoom?.roomLatitude),
    lon: Number(findRoom?.roomLongitude),
  };
  const placeName = findRoom?.roomDescription.slice(
    findRoom.roomDescription.length - 6,
    findRoom.roomDescription.length,
  );

  console.log(placeName);

  return (
    <main className="flex flex-col bg-neutral-500">
      <Header />
      <div className="flex w-full flex-col items-start justify-start rounded-t-2xl border-t bg-white p-[3%] pb-[7rem]">
        {/* room type */}
        <div className="my-[5%] flex w-full flex-col items-center gap-1">
          <p className="text-xl font-bold">{findRoom?.roomDescription}</p>
          <div className="flex items-center gap-1 text-sm text-neutral-500">
            <p>{findRoom?.roomDescription}</p>
            <span className="text-neutral-500">&#183;</span>
            <p>{findRoom?.roomType}</p>
          </div>
        </div>
        <hr className="h-[1px] w-full bg-neutral-300" />

        {/* room host */}
        <div className="my-[5%] flex items-center gap-1">
          <RxAvatar size={50} />
          <div>
            <p>Stay with {findHost?.hostName}</p>
            <p className="text-neutral-500">
              {findHost?.hostingYears} years hosting
            </p>
          </div>
        </div>
        <hr className="h-[1px] w-full bg-neutral-300" />

        {/* room about */}
        <div className="my-[5%] flex flex-col gap-1">
          <p className="text-xl font-bold">About this place</p>
          <p>{findRoom?.roomAbout}</p>
        </div>
        <hr className="h-[1px] w-full bg-neutral-300" />

        {/* room amenities */}
        <Amenities roomId={findRoom?.id!} />
        <hr className="h-[1px] w-full bg-neutral-300" />

        {/* room location */}
        <Maps findRoom={castRoomCoor} placeName={placeName!} />
        <hr className="h-[1px] w-full bg-neutral-300" />

        {/* calendar */}
        <BookingCalendar placeName={placeName!} />
        <hr className="h-[1px] w-full bg-neutral-300" />

        {/* room reviews */}
        <Reviews
          roomId={findRoom?.id!}
          roomRating={Number(findRoom?.roomRating)}
        />
        <hr className="h-[1px] w-full bg-neutral-300" />

        {/* room reviews */}
        <Host
          hostId={findRoom?.hostId!}
          roomId={findRoom?.id!}
          roomRating={Number(findRoom?.roomRating)}
        />
      </div>
      <div className="fixed bottom-0 z-50 flex h-[7rem] w-full items-center justify-between border-t-2 bg-white px-[7%] py-[3%]">
        <div className="flex gap-0.5 underline">
          <p className="font-bold">£{Number(findRoom?.roomPrice)}</p>
          <p>/night</p>
        </div>
        <Link href={"/checkout"}>
          <button className="h-[3rem] w-[8rem] rounded-full bg-linear-to-r from-neutral-400 to-neutral-900 font-bold text-white shadow">
            Reserve
          </button>
        </Link>
      </div>
    </main>
  );
};

export default Room;
