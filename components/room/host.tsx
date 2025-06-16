import { getHosts, getRoomReviews } from "@/lib/actions/place.actions";
import { Star } from "lucide-react";
import { RxAvatar } from "react-icons/rx";

type HostProps = {
  hostId: string;
  roomRating: number;
  roomId: string;
};

const Host = async ({ hostId, roomRating, roomId }: HostProps) => {
  const hosts = await getHosts();
  const reviews = await getRoomReviews();

  const findHosts = hosts.find((host) => host.id === hostId);
  const findReviews = reviews.filter((review) => review.roomId === roomId);

  return (
    <div className="my-[5%] flex w-full flex-col items-center gap-1 p-[2%] md:flex md:flex-row md:items-start md:justify-between md:my-0">
      <div className="flex flex-col w-full lg:w-[30%]">
        <p className="mb-[2%] text-xl font-bold">Meet your host</p>
        <div className="flex h-[12rem] items-center justify-between rounded-xl border p-[4%] shadow">
          <div className="flex flex-col items-center justify-center">
            <RxAvatar size={70} />
            <p className="text-xl font-bold">{findHosts?.hostName}</p>
            <p className="text-neutral-600">Host</p>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex flex-col">
              <p className="text-lg font-bold">{findReviews.length}</p>
              <p className="text-xs text-neutral-600">Reviews</p>
            </div>
            <hr className="h-[1px] bg-neutral-400" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1">
                <p className="text-lg font-bold">{roomRating}</p>
                <Star fill="black" size={15} />
              </div>
              <p className="text-xs text-neutral-600">Rating</p>
            </div>
            <hr className="h-[1px] bg-neutral-400" />
            <div className="flex flex-col">
              <p className="text-lg font-bold">{findHosts?.hostingYears}</p>
              <p className="text-xs text-neutral-600">Years hosting</p>
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[4%] lg:w-[60%] flex flex-col p-[2%]">
        <p className="pb-[4%] text-center text-xl font-bold md:text-start">
          About the host
        </p>
        <p>{findHosts?.hostDescription}</p>
      </div>
    </div>
  );
};

export default Host;
