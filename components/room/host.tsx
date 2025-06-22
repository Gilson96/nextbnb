import { getHosts, getRoomReviews } from "@/lib/actions/place.actions";
import { Star } from "lucide-react";
import { RxAvatar } from "react-icons/rx";

type HostProps = {
  hostId: string;
  roomRating: number;
  roomId: string;
};

const Host = async ({ hostId, roomRating, roomId }: HostProps) => {
  try {
    const hosts = await getHosts();
    const reviews = await getRoomReviews();

    const findHost = hosts.find((host) => host.id === hostId);
    const findReviews = reviews.filter((review) => review.roomId === roomId);

    const hostName = findHost?.hostName ?? "Admin";
    const hostingYears = findHost?.hostingYears ?? 2;
    const hostDescription = findHost?.hostDescription;

    return (
      <section
        aria-label="Host information"
        className="my-[5%] flex w-full flex-col items-center gap-1 p-[2%] md:my-0 md:flex md:flex-row md:items-start md:justify-between"
      >
        <div className="flex w-full flex-col lg:w-[30%]">
          <h2 className="mb-[2%] text-xl font-bold">Meet your host</h2>
          <div className="flex h-[12rem] items-center justify-between rounded-xl border p-[4%] shadow">
            <div className="flex flex-col items-center justify-center">
              <RxAvatar size={70} aria-label="Host avatar" />
              <p className="text-xl font-bold">{hostName}</p>
              <p className="text-neutral-600">Host</p>
            </div>
            <div className="flex flex-col gap-2">
              {findReviews.length > 0 && (
                <>
                  <div className="flex flex-col">
                    <p className="text-lg font-bold">{findReviews.length}</p>
                    <p className="text-xs text-neutral-600">Reviews</p>
                  </div>
                  <hr className="h-[1px] bg-neutral-400" />
                </>
              )}
              <div className="flex flex-col">
                <div className="flex items-center gap-1">
                  <p className="text-lg font-bold">{roomRating}</p>
                  <Star fill="black" size={15} aria-label="Rating star" />
                </div>
                <p className="text-xs text-neutral-600">Rating</p>
              </div>
              <hr className="h-[1px] bg-neutral-400" />
              <div className="flex flex-col">
                <p className="text-lg font-bold">{hostingYears}</p>
                <p className="text-xs text-neutral-600">Years hosting</p>
              </div>
            </div>
          </div>
        </div>
        {hostDescription && (
          <aside className="mt-[4%] flex flex-col p-[2%] lg:w-[60%]">
            <h3 className="pb-[4%] text-center text-xl font-bold md:text-start">
              About the host
            </h3>
            <p>{hostDescription}</p>
          </aside>
        )}
      </section>
    );
  } catch (error) {
    console.error("Error fetching host or reviews:", error);
    return <div>Error loading host information.</div>;
  }
};

export default Host;
