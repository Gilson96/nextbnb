import Filters from "@/components/navigator/filters";
import Navigator from "@/components/navigator/navigator";
import RoomList from "@/components/place/roomList";
import { getHosts, getPlaces, getRooms } from "@/lib/actions/place.actions";

const Page = async ({ params }: { params: { filters: string[] } }) => {
  const [location, type, price] = params.filters;

  const rooms = await getRooms();
  const hosts = await getHosts();
  const places = await getPlaces();

  const filteredRooms = [...rooms]
    .filter((room) => location === "all" || room.roomLocation === location)
    .filter((room) => {
      if (type === "all") return true;
      if (type === "room") {
        return (
          room.roomType === "Single room" || room.roomType === "Double room"
        );
      }
      return ["Studio", "1-bedroom apartment", "Entire place"].includes(
        room.roomType,
      );
    })
    .sort((a, b) => {
      if (price === "high") return b.roomPrice - a.roomPrice;
      if (price === "low") return a.roomPrice - b.roomPrice;
      return 0;
    });

  return (
    <main className="flex w-full flex-col items-center justify-center">
      <Navigator places={places} rooms={rooms} />
      <i className="flex w-full justify-end max-md:py-[3%] max-md:pr-[4%] md:hidden">
        <Filters places={places} />
      </i>
      <div className="lg flex flex-col gap-2 md:mt-[5%] md:grid md:grid-cols-2 md:gap-[5rem] lg:mt-0 lg:flex lg:flex-row lg:flex-wrap lg:p-[2%]">
        {filteredRooms.map((room) => {
          const host = hosts.find((h) => h.id === room.hostId);
          return (
            <RoomList
              key={room.id}
              hostName={host?.hostName || "Unknown Host"}
              hostingYears={host?.hostingYears || 0}
              id={room.id}
              roomDescription={room.roomDescription}
              roomPrice={room.roomPrice}
              roomRating={Number(room.roomRating)}
              roomType={room.roomType}
            />
          );
        })}
      </div>
    </main>
  );
};

export default Page;
