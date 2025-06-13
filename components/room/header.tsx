import { getRoomGallery } from "@/lib/actions/place.actions";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type HeaderProps = {
  roomDescription?: string;
  roomType?: string;
  hostName?: string;
  hostingYears?: number;
  roomId?: string;
  roomAbout?: string;
};

const Header = async ({ roomId }: HeaderProps) => {
  const gallery = await getRoomGallery();
  const findImages = gallery.find((image) => image.roomId === roomId);

  return (
    <>
      <div className="md:hidden">
        <Carousel>
          <CarouselContent className="w-full">
            {findImages?.imageUrl.map((image, index) => (
              <CarouselItem className="w-full">
                <div
                  style={{
                    backgroundImage: `url("${findImages?.imageUrl[index]}")`,
                  }}
                  className={`flex h-[16rem] w-[27rem] items-start justify-between bg-cover bg-no-repeat pt-[4%] pr-[5%] pl-[3%]`}
                >
                  <Link
                    href={"/"}
                    className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-neutral-300 shadow"
                  >
                    <ArrowLeft size={20} />
                  </Link>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
      <div></div>
    </>
  );
};

export const RoomDetails = ({
  roomDescription,
  roomType,
  hostName,
  hostingYears,
}: HeaderProps) => {
  return (
    <>
      {/* room type */}
      <div className="my-[5%] flex w-full flex-col items-center gap-1">
        <p className="text-xl font-bold">{roomDescription}</p>
        <div className="flex items-center gap-1 text-sm text-neutral-500">
          <p>{roomDescription}</p>
          <span className="text-neutral-500">&#183;</span>
          <p>{roomType}</p>
        </div>
      </div>
      <hr className="h-[1px] w-full bg-neutral-300" />

      {/* room host */}
      <div className="my-[5%] flex items-center gap-1">
        <RxAvatar size={50} />
        <div>
          <p>Stay with {hostName}</p>
          <p className="text-neutral-500">{hostingYears} years hosting</p>
        </div>
      </div>
    </>
  );
};

export const RoomAbout = ({ roomAbout }: HeaderProps) => {
  return (
    <div className="my-[5%] flex flex-col gap-1">
      <p className="text-xl font-bold">About this place</p>
      <p>{roomAbout}</p>
    </div>
  );
};

export default Header;
