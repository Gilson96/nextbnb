import Header from "@/components/home/header";
import PlaceHeader from "@/components/place/header";
import RoomList from "@/components/place/roomList";
import {
  getHosts,
} from "@/lib/actions/place.actions";
import { ArrowLeft } from "lucide-react";

const Place = async (props: { params: Promise<{ placeName: string }> }) => {
  const { placeName } = await props.params;

  return (
    <main className="flex flex-col justify-between">
      <PlaceHeader />
      <div className="h-[10rem] w-full bg-neutral-500"></div>
      <div className="w-full flex-col rounded-t-lg border-t bg-white p-[5%]">
        {/* {showRoomsByPlace()?.map((room, index) => (
          <RoomList
            key={index}
            id={room.id}
            roomDescription={room.roomDescription}
            roomPrice={room.roomPrice}
            roomRating={Number(room.roomRating)}
            roomType={room.roomType}
            hostName={hosts.find((host) => host.id === room.hostId)?.hostName!}
            hostingYears={
              hosts.find((host) => host.id === room.hostId)?.hostingYears!
            }
          />
        ))} */}
      </div>
    </main>
  );
};

export default Place;
