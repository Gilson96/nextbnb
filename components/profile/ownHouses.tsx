"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GalleryTypes, RoomsType } from "@/lib/actions/place.actions";
import { House, SearchX } from "lucide-react";
import { useState } from "react";
import MyHouse from "./myHouse";

type OwnHousesProps = {
  ownHouses: RoomsType[];
  gallery: GalleryTypes[];
  hostId: string | null;
};

const OwnHouses = ({ ownHouses, gallery, hostId }: OwnHousesProps) => {
  const [selectedHouse, setselectedHouse] = useState<string | null>(null);
  const [savedImage, setSavedImage] = useState<string[][]>()
  const handleBack = () => setselectedHouse(null);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex h-[7rem] cursor-pointer flex-col items-center justify-center rounded-2xl border shadow">
          <House size={40} />
          <p>Own Houses</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-center">Own Houses</DialogTitle>
          {ownHouses.length === 0 ? (
            <div className="flex flex-col justify-center h-[20rem] gap-2 items-center">
              <SearchX size={70} className="text-neutral-400" />
              <p className="text-neutral-400 text-xl">no results found</p>
            </div>
          ) : (
            <>
              {!selectedHouse && (
                <div className="flex max-h-[20rem] flex-col gap-3 overflow-hidden overflow-y-auto">
                  {ownHouses.map((room, index) => {
                    const findRoomImage = gallery
                      .filter((image) => image.roomId === room.id)
                      .map((img) => img.imageUrl)
                      
                    return (
                      <div key={index}>
                        <hr className="my-[1%] h-[0.5px] w-full bg-neutral-300" />
                        <div
                          className="flex cursor-pointer items-center gap-3"
                          onClick={() => {setselectedHouse(room.id!); setSavedImage(findRoomImage)}} 
                        >
                          <div
                            className="h-[5rem] w-[5rem] rounded-2xl bg-cover bg-center bg-no-repeat"
                            style={{ backgroundImage: `url(${findRoomImage.at(0)?.at(0)})` }}
                          ></div>
                          <div className="flex flex-col">
                            <div className="flex gap-1">
                              <p className="font-bold">Location:</p>
                              <p>{room.roomLocation}</p>
                            </div>
                            <div className="flex gap-1">
                              <p className="font-bold">Price:</p>
                              <p>£{room.roomPrice}</p>
                            </div>
                            <div className="flex gap-1">
                              <p className="font-bold">Type:</p>
                              <p>{room.roomType}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Detail View */}
              {selectedHouse && (
                <MyHouse
                  selectedHouse={selectedHouse}
                  ownHouses={ownHouses}
                  savedImages={savedImage!}
                  handleBack={handleBack}
                />
              )}
            </>
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default OwnHouses;
