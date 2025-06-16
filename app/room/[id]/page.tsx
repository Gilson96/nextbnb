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
import Footer, { StickyFooter } from "@/components/room/footer";
import Gallery from "@/components/room/gallery";
import { RoomDetails } from "@/components/room/details";
import Navigator from "@/components/navigator/navigator";

const Room = async (props: { params: Promise<{ id: string }> }) => {
  const { id } = await props.params;
  const rooms: RoomsType[] = await getRooms();
  const hosts: HostsTypes[] = await getHosts();
  const image: GalleryTypes[] = await getRoomGallery();
  const places: PlacesType[] = await getPlaces();

  const findRoom = rooms.find((room) => room.id === id);
  const findHost = hosts.find((host) => host.id === findRoom?.hostId);
  const findRoomImage = image.filter((image) => image.roomId === id);

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
      <Navigator places={places} rooms={rooms} />
      <Gallery findRoomImage={findRoomImage} />

      <div className="flex w-full flex-col items-start justify-start max-md:rounded-t-2xl max-md:border-t max-md:bg-white max-md:p-[3%] max-md:pb-[7rem]">
        <div className="md:relative md:flex md:justify-between md:px-[2%]">
          <div className="">
          <RoomDetails
            hostName={findHost?.hostName!}
            hostingYears={findHost?.hostingYears!}
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
          <div className="sticky top-[1rem] max-md:hidden self-start">
            <StickyFooter
              room={findRoom!}
              host={findHost!}
              roomImage={findRoomImage[0].imageUrl[0]}
              roomPrice={findRoom?.roomPrice!}
            />
          </div>
        </div>
          <hr className="h-[1px] w-[95%] place-self-center bg-neutral-300" />
        <Maps findRoom={castRoomCoor} placeName={placeName!} />
        <hr className="h-[1px] w-[95%] place-self-center bg-neutral-300" />
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

      <Footer
        room={findRoom!}
        host={findHost!}
        roomImage={findRoomImage[0].imageUrl[0]}
        roomPrice={findRoom?.roomPrice!}
      />
    </main>
  );
};

export default Room;
