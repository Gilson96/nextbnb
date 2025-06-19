"use client";
import { GalleryTypes, RoomsType } from "@/lib/actions/place.actions";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel";
import Link from "next/link";
import { ArrowLeft, Grip, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { Session } from "next-auth";
import { useWishlist } from "@/hooks/useWishlits";

type RoomGalleryProps = {
  findRoomImage?: GalleryTypes[];
  session: Session | null;
  roomId: string;
  room: RoomsType;
  initialWishlist?: { id: string }[];
  userId?: string;
};

const RoomGallery = ({
  findRoomImage,
  session,
  roomId,
  initialWishlist = [],
  userId = session?.user.id,
}: RoomGalleryProps) => {
  const { isInWishlist, toggleWishlist, loading } = useWishlist(
    userId,
    initialWishlist,
  );

  return (
    <>
      {/* mobile */}
      <div className="md:hidden">
        <Carousel>
          <CarouselContent className="w-full">
            {findRoomImage?.map((image, index) =>
              image.imageUrl.map((img) => (
                <CarouselItem key={index} className="w-full">
                  <div
                    style={{
                      backgroundImage: `url("${img}")`,
                    }}
                    className={`flex h-[16rem] w-[27rem] items-start justify-between bg-cover bg-no-repeat pt-[4%] pr-[5%] pl-[3%]`}
                  >
                    <Link
                      href={"/"}
                      className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-neutral-300 shadow"
                    >
                      <ArrowLeft size={20} />
                    </Link>
                    <button
                      className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-neutral-300 shadow"
                      onClick={() => toggleWishlist(roomId)}
                      disabled={loading}
                    >
                      <Heart fill={isInWishlist(roomId) ? "black" : "none"} />
                    </button>
                  </div>
                </CarouselItem>
              )),
            )}
          </CarouselContent>
        </Carousel>
      </div>
      {/* Desktop */}
      <div className="flex w-full flex-col items-end justify-end p-[2%] max-md:hidden">
        <div className="grid h-[30rem] w-full grid-flow-col grid-rows-2 gap-4">
          {findRoomImage?.map((image, index) =>
            image.imageUrl.map((img) => (
              <div
                key={index}
                style={{
                  backgroundImage: `url("${img}")`,
                }}
                className={`h-full bg-cover bg-center bg-no-repeat first:row-span-2`}
              ></div>
            )),
          )}
        </div>
        <Dialog>
          <DialogTrigger className="cursor-pointer">
            <Button
              type="button"
              className="relative bottom-[3rem] flex w-[10rem] cursor-pointer items-center justify-between gap-2 p-[2%]"
            >
              <Grip />
              <p>Show all photos</p>
            </Button>
          </DialogTrigger>
          <DialogContent className="flex h-[20rem] w-full items-center justify-center">
            <Carousel className="h-full w-[80%] place-content-center place-items-center">
              <CarouselContent>
                {findRoomImage?.map((image, index) =>
                  image.imageUrl.map((img) => (
                    <CarouselItem key={index}>
                      <Image width={500} height={500} src={img} alt={""} />
                    </CarouselItem>
                  )),
                )}
              </CarouselContent>
              <CarouselPrevious className="cursor-pointer" />
              <CarouselNext className="cursor-pointer" />
            </Carousel>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default RoomGallery;
