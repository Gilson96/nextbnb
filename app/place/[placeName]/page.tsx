import Header from "@/components/home/header";
import PlaceHeader from "@/components/place/header";
import RoomList from "@/components/place/roomList";
import {
  getBoltonRooms,
  getOldHamRooms,
  getSalfordRooms,
  getStockportRooms,
  getHosts,
} from "@/lib/actions/place.actions";
import { ArrowLeft } from "lucide-react";

const Place = async (props: { params: Promise<{ placeName: string }> }) => {
  const { placeName } = await props.params;
  const oldHamRooms = await getOldHamRooms();
  const salfordRooms = await getSalfordRooms();
  const boltonRooms = await getBoltonRooms();
  const stockportRooms = await getStockportRooms();
  const hosts = await getHosts();

  const showRoomsByPlace = () => {
    if (placeName === "Oldham") return oldHamRooms;
    if (placeName === "Salford") return salfordRooms;
    if (placeName === "Bolton") return boltonRooms;
    if (placeName === "Stockport") return stockportRooms;
  };

  return (
    <main className="flex flex-col justify-between">
      <PlaceHeader />
      <div className="h-[10rem] w-full bg-neutral-500"></div>
      <div className="w-full flex-col rounded-t-lg border-t bg-white p-[5%]">
        {showRoomsByPlace()?.map((room, index) => (
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
        ))}
      </div>
    </main>
  );
};

export default Place;
