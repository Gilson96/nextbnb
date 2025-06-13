import FiltersSetup from "@/components/home/filtersSetup";
import Header from "@/components/home/header";
import RoomList from "@/components/place/roomList";
import { getHosts, getPlaces, getRooms } from "@/lib/actions/place.actions";

type PageProps = {
  params: {
    location: string;
    type: string;
    price: string;
  };
};

const Page = async ({ params }: PageProps) => {
  const [location] = await params.location;
  const [type] = await params.type;
  const [price] = await params.price;

  const rooms = await getRooms();
  const hosts = await getHosts();
  const places = await getPlaces();

  const showRoomsByFilters = () => {
    //clone to avoid mutating
    let filteredRooms = [...rooms];
    // By location
    if (location !== "all") {
      filteredRooms = filteredRooms.filter(
        (room) => room.roomLocation === location,
      );
    }
    // By type
    if (type !== "all") {
      if (type === "room") {
        filteredRooms = filteredRooms.filter(
          (room) =>
            room.roomType === "Single room" || room.roomType === "Double room",
        );
      } else {
        filteredRooms = filteredRooms.filter(
          (room) =>
            room.roomType === "Studio" ||
            room.roomType === "1-bedroom apartment" ||
            room.roomType === "Entire place",
        );
      }
    }
    // By price
    if (price === "high") {
      filteredRooms = filteredRooms.sort((a, b) => b.roomPrice - a.roomPrice);
    } else if (price === "low") {
      filteredRooms = filteredRooms.sort((a, b) => a.roomPrice - b.roomPrice);
    }

    return filteredRooms;
  };

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Header places={places} rooms={rooms} />
      <i className="flex w-full justify-end pr-[5%] pb-[7%]">
        <FiltersSetup places={places} />
      </i>
      <div className="flex flex-col gap-2">
        {showRoomsByFilters().map((room, index) => (
          <RoomList
            key={index}
            hostName={hosts.find((h) => h.id === room.hostId)?.hostName!}
            hostingYears={
              hosts.find((h) => h.id === room.hostId)?.hostingYears!
            }
            id={room.id}
            roomDescription={room.roomDescription}
            roomPrice={room.roomPrice}
            roomRating={Number(room.roomRating)}
            roomType={room.roomType}
          />
        ))}
      </div>
    </main>
  );
};

export default Page;
