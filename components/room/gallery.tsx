"use client";
import { GalleryTypes } from "@/lib/actions/place.actions";
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
import { toast } from "sonner";
import { addToWishlist } from "@/lib/actions/users.actions";
import { useState } from "react";

type RoomGalleryProps = {
  findRoomImage?: GalleryTypes[];
  session: Session | null;
  roomId: string;
};

const RoomGallery = ({ findRoomImage, session, roomId }: RoomGalleryProps) => {
  const [wishlisted, setWishlisted] = useState(false);

  console.log(session?.user.wishlist)
  // const handleToggleWishlist = async () => {
  //   if (!session) {
  //     toast("Please sign in to manage your wishlist.");
  //     return;
  //   }

  //   try {
  //     if (wishlisted) {
  //       await removeToWishlist(roomId); // Assuming roomId is sufficient to identify wishlist item
  //       setWishlisted(false);
  //       toast("Removed from wishlist");
  //     } else {
  //       await addToWishlist({ userId: session.user.id, roomId });
  //       setWishlisted(true);
  //       toast("Added to wishlist");
  //     }
  //   } catch (error) {
  //     console.error("Wishlist update failed:", error);
  //     toast("Failed to update wishlist");
  //   }
  // };

  return (
    <>
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
                    {/* <i
                      className="flex h-[2rem] w-[2rem] items-center justify-center rounded-full bg-neutral-300 shadow"
                      onClick={() => handleToggleWishlist}
                    >
                      {wishlisted ? (
                        <Heart size={20} fill="black" />
                      ) : (
                        <Heart size={20} />
                      )}
                    </i> */}
                  </div>
                </CarouselItem>
              )),
            )}
          </CarouselContent>
        </Carousel>
      </div>
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
function removeToWishlist(roomId: string) {
  throw new Error("Function not implemented.");
}
