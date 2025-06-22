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
  roomId: string;
  roomAbout?: string;
};

const RoomCarousel = ({ images }: { images: string[] }) => {
  if (!images || images.length === 0) return <div>No images available.</div>;

  return (
    <Carousel>
      <CarouselContent className="w-full">
        {images.map((image, index) => (
          <CarouselItem key={index} className="w-full">
            <div
              style={{ backgroundImage: `url("${image}")` }}
              className="flex h-[16rem] w-[27rem] items-start justify-between bg-cover bg-no-repeat pt-[4%] pr-[5%] pl-[3%]"
              role="img"
              aria-label={`Room image ${index + 1}`}
            >
              <Link
                href="/"
                className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-neutral-300 shadow"
                aria-label="Back to home"
              >
                <ArrowLeft size={20} />
              </Link>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
};

const Header = async ({ roomId }: HeaderProps) => {
  try {
    const gallery = await getRoomGallery();

    if (!gallery || gallery.length === 0) {
      return <div>Gallery not available.</div>;
    }

    const findImages = gallery.find((image) => image.roomId === roomId);

    if (
      !findImages ||
      !findImages.imageUrl ||
      findImages.imageUrl.length === 0
    ) {
      return <div>No images found for this room.</div>;
    }

    return (
      <div className="md:hidden">
        <RoomCarousel images={findImages.imageUrl} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching gallery:", error);
    return <div>Error loading images.</div>;
  }
};

export const RoomDetails = ({
  roomDescription = "No description available",
  roomType = "Room type not specified",
  hostName = "Host",
  hostingYears = 0,
}: HeaderProps) => {
  return (
    <div className="my-[5%] flex w-full flex-col items-center gap-1">
      <p className="text-xl font-bold">{roomDescription}</p>
      <div className="flex items-center gap-1 text-sm text-neutral-500">
        <p>{roomDescription}</p>
        <span className="text-neutral-500">&#183;</span>
        <p>{roomType}</p>
      </div>
      <hr className="my-4 h-[1px] w-full bg-neutral-300" />
      <div className="flex items-center gap-1">
        <RxAvatar size={50} />
        <div>
          <p>Stay with {hostName}</p>
          <p className="text-neutral-500">{hostingYears} years hosting</p>
        </div>
      </div>
    </div>
  );
};

export const RoomAbout = ({
  roomAbout = "No information available.",
}: HeaderProps) => {
  return (
    <div className="my-[5%] flex flex-col gap-1">
      <p className="text-xl font-bold">About this place</p>
      <p>{roomAbout}</p>
    </div>
  );
};

export default Header;
