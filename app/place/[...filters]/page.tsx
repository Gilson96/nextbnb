import Filters from "@/components/navigator/filters";
import Navigator from "@/components/navigator/navigator";
import RoomList from "@/components/place/roomList";
import { getHosts, getPlaces, getRooms } from "@/lib/actions/place.actions";

interface PageProps {
  params: { filters: string[] };
}

const Page = async ({ params }: PageProps) => {
  const [location = "all", type = "all", price = "all"] = params.filters;


  const rooms = await getRooms();
  const hosts = await getHosts();
  const places = await getPlaces();

  console.log(location);
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

  console.log(showRoomsByFilters());
  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Navigator places={places} rooms={rooms} />
      <i className="flex w-full justify-end max-md:py-[3%] max-md:pr-[4%] md:hidden">
        <Filters places={places} />
      </i>
      <div className="lg flex flex-col gap-2 md:mt-[5%] md:grid md:grid-cols-2 md:gap-[5rem] lg:mt-0 lg:flex lg:flex-row lg:flex-wrap lg:p-[2%]">
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
