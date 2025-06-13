import { RxAvatar } from "react-icons/rx";

type RoomDetailsProps = {
  roomDescription: string;
  roomType: string;
  hostName: string;
  hostingYears: number;
  roomAbout: string;
};

export const RoomDetails = ({
  roomDescription,
  roomType,
  hostName,
  hostingYears,
  roomAbout,
}: RoomDetailsProps) => {
  return (
    <div className="md:w-[50%] md:p-[2%] md:text-base">
      {/* room type */}
      <div className="my-[5%] flex w-full flex-col items-center gap-1 md:my-0 md:items-start">
        <p className="md:text-2xl text-xl font-bold">{roomDescription}</p>
        <div className="flex items-center gap-1 text-sm text-neutral-500 md:text-base">
          <p>{roomDescription}</p>
          <span className="text-neutral-500">&#183;</span>
          <p className="">{roomType}</p>
        </div>
      </div>
      <hr className="h-[1px] w-full bg-neutral-300 md:my-[5%]" />

      {/* room host */}
      <div className="my-[5%] flex items-center gap-1">
        <i className="md:hidden">
          {" "}
          <RxAvatar size={50} />
        </i>
        <i className="max-md:hidden">
          {" "}
          <RxAvatar size={70} />
        </i>

        <div>
          <p>Stay with {hostName}</p>
          <p className="text-neutral-500">{hostingYears} years hosting</p>
        </div>
      </div>
      <hr className="h-[1px] w-full bg-neutral-300" />
      <div className="my-[5%] flex flex-col gap-1">
        <p className="text-xl font-bold ">About this place</p>
        <p className="text-justify md:leading-8">{roomAbout}</p>
      </div>
      <hr className="h-[1px] w-full bg-neutral-300" />
    </div>
  );
};
