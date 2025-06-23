import Amenities from "@/components/room/amenities";
import BookingCalendar from "@/components/room/bookingCalendar";
import Host from "@/components/room/host";
import Maps from "@/components/room/map";
import Reviews from "@/components/room/reviews";
import {
  GalleryTypes,
  getHosts,
  getPlaces,
  getRoomGallery,
  getRooms,
  HostsTypes,
  PlacesType,
  RoomsType,
} from "@/lib/actions/place.actions";
import Footer from "@/components/room/footer";
import Gallery from "@/components/room/gallery";
import { RoomDetails } from "@/components/room/details";
import Navigator from "@/components/navigator/navigator";
import { getServerSession, Session } from "next-auth";
import { authConfig } from "@/auth";
import { StickyFooter } from "@/components/room/stickyFooter";

interface RoomProps {
  params: {
    id: string;
  };
}

const Room = async ({ params }: RoomProps) => {
  const { id } = params;
  const rooms: RoomsType[] = await getRooms();
  const hosts: HostsTypes[] = await getHosts();
  const image: GalleryTypes[] = await getRoomGallery();
  const places: PlacesType[] = await getPlaces();
  const session: Session | null = await getServerSession(authConfig);
  const admin = session?.user.name === "Admin";

  const findRoom = rooms.find((room) => room.id === id);
  const findHost = hosts.find((host) => host.id === findRoom?.hostId);
  const findRoomImage = image.filter((image) => image.roomId === id);
  const isAdminRoom = rooms.some((room) => room.hostId === session?.user.id);

  const castRoomCoor = {
    lat: Number(findRoom?.roomLatitude),
    lon: Number(findRoom?.roomLongitude),
  };
  const placeName = findRoom?.roomDescription.slice(
    findRoom.roomDescription.length - 6,
    findRoom.roomDescription.length,
  );

  return (
    <main className="relative flex h-full w-full flex-col">
      <Navigator places={places} rooms={rooms} session={session} />
      <Gallery
        roomId={findRoom?.id!}
        findRoomImage={findRoomImage}
        session={session}
        room={findRoom!}
      />

      <div className="flex w-full flex-col items-start justify-start max-md:rounded-t-2xl max-md:border-t max-md:bg-white max-md:p-[3%] max-md:pb-[7rem]">
        <div className="md:relative md:flex md:justify-between md:px-[2%]">
          <div className="">
            <RoomDetails
              hostName={
                findHost?.hostName! === undefined
                  ? "Admin"
                  : findHost?.hostName!
              }
              hostingYears={
                findHost?.hostingYears! === undefined
                  ? 2
                  : findHost?.hostingYears!
              }
              roomDescription={findRoom?.roomDescription!}
              roomType={findRoom?.roomType!}
              roomAbout={findRoom?.roomAbout!}
            />
            <Amenities roomId={findRoom?.id!} />
            <BookingCalendar
              roomPrice={findRoom?.roomPrice!}
              placeName={placeName!}
            />
          </div>
          <div className="sticky top-[1rem] self-start max-md:hidden">
            <StickyFooter
              room={findRoom!}
              host={findHost!}
              roomImage={findRoomImage[0].imageUrl[0]}
              roomPrice={findRoom?.roomPrice!}
              session={session}
            />
          </div>
        </div>
        <hr className="h-[1px] w-[95%] place-self-center bg-neutral-300" />
        <Maps findRoom={castRoomCoor} placeName={placeName!} />
        <hr className="h-[1px] w-[95%] place-self-center bg-neutral-300" />
        <div
          className={`${!isAdminRoom ? "w-full flex-row-reverse justify-between" : "hidden"}`}
        >
          <Reviews
            roomId={findRoom?.id!}
            roomRating={Number(findRoom?.roomRating)}
          />
          <hr className="h-[1px] w-[95%] place-self-center bg-neutral-300" />
          <Host
            hostId={findRoom?.hostId!}
            roomId={findRoom?.id!}
            roomRating={Number(findRoom?.roomRating)}
          />
        </div>
      </div>

      <Footer
        room={findRoom!}
        host={findHost!}
        roomImage={findRoomImage[0].imageUrl[0]}
        roomPrice={findRoom?.roomPrice!}
        session={session}
      />
    </main>
  );
};

export default Room;
