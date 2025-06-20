import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  GalleryTypes,
  HostsTypes,
  RoomsType,
} from "@/lib/actions/place.actions";
import { WishlistTypes } from "@/lib/actions/users.actions";
import { Heart, SearchX } from "lucide-react";
import Link from "next/link";

type WishlistProps = {
  wishlist: WishlistTypes[];
  gallery: GalleryTypes[];
  host: HostsTypes[];
  rooms: RoomsType[];
};

const Wishlists = ({ wishlist, gallery, rooms }: WishlistProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        <div className="flex h-[7rem] cursor-pointer flex-col items-center justify-center rounded-2xl border shadow">
          <Heart size={40} />
          <p>Wishlist</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Wishlist</DialogTitle>

          <DialogDescription className="flex max-h-[20rem] flex-col gap-3 overflow-hidden overflow-y-auto">
            {wishlist.length === 0 ? (
              <div className="flex h-[20rem] flex-col items-center justify-center gap-2">
                <SearchX size={70} className="text-neutral-400" />
                <p className="text-xl text-neutral-400">no results found</p>
              </div>
            ) : (
              <>
                {wishlist.map((room, index) => {
                  const findRoom = rooms.find((r) => r.id === room.roomId);
                  const findRoomImage = gallery
                    .filter((image) => image.roomId === findRoom?.id)
                    .map((img) => img.imageUrl);
                  return (
                    <>
                      <hr className="my-[1%] h-[0.5px] w-full bg-neutral-300" />
                      <Link
                        href={`/room/${findRoom?.id}`}
                        key={index}
                        className="flex cursor-pointer items-center gap-3"
                      >
                        <div
                          className="h-[5rem] w-[5rem] rounded-2xl bg-cover bg-center bg-no-repeat"
                          style={{ backgroundImage: `url(${findRoomImage})` }}
                        ></div>
                        <div className="flex flex-col">
                          <div className="flex gap-1">
                            <p className="font-bold">Location:</p>
                            <p>{findRoom?.roomLocation}</p>
                          </div>
                          <div className="flex gap-1">
                            <p className="font-bold">Price:</p>
                            <p>£{findRoom?.roomPrice}</p>
                          </div>
                          <div className="flex gap-1">
                            <p className="font-bold">Type:</p>
                            <p>{findRoom?.roomType}</p>
                          </div>
                        </div>
                      </Link>
                    </>
                  );
                })}
              </>
            )}
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Wishlists;
