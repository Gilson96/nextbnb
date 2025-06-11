import { getRoomGallery } from "@/lib/actions/place.actions";
import { ArrowLeft, Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type HeaderProps = {
  roomDescription?: string;
  roomType?: string;
  hostName?: string;
  hostingYears?: number;
  roomId?: string;
};

const Header = async ({ roomId }: HeaderProps) => {
  const gallery = await getRoomGallery();

  const findImages = gallery.find((image) => image.roomId === roomId);
  console.log(findImages?.imageUrl[0]);
  return (
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
    // <div className="flex h-[15rem] w-full justify-between bg-neutral-500 p-[2%]">
    //  <Carousel/>
    //   <Image
    //     src={findImages?.imageUrl[0]!}
    //     width={500}
    //     height={500}
    //     alt="Picture of the author"
    //   />
    //   <Link
    //     href={"/"}
    //     className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-neutral-300 shadow"
    //   >
    //     <ArrowLeft size={20} />
    //   </Link>
    //   <i className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-neutral-300 shadow">
    //     <Heart size={20} />
    //   </i>
    // </div>
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

export default Header;
