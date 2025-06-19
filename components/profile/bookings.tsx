"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { GalleryTypes, HostsTypes, RoomsType } from "@/lib/actions/place.actions";
import { BookingTypes } from "@/lib/actions/users.actions";
import { MapPinHouse } from "lucide-react";
import { useState } from "react";
import PastTrips from "./pastTrips";

type WishlistProps = {
  bookings: BookingTypes[];
  rooms: RoomsType[];
  gallery: GalleryTypes[];
  hosts: HostsTypes[]
};

const Bookings = ({ bookings, rooms, gallery, hosts }: WishlistProps) => {
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  
  const handleBack = () => setSelectedBooking(null);

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex h-[7rem] cursor-pointer flex-col items-center justify-center rounded-2xl border shadow">
          <MapPinHouse size={40} />
          <p>Past trips</p>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Past trips</DialogTitle>
          {!selectedBooking && (
            <div className="flex max-h-[20rem] flex-col gap-3 overflow-hidden overflow-y-auto">
              {bookings.map((booking, index) => {
                const findRoom = rooms.find((r) => r.id === booking.roomId);
                const findRoomImage = gallery
                  .filter((image) => image.roomId === findRoom?.id)
                  .map((img) => img.imageUrl);

                return (
                  <div key={index}>
                    <hr className="my-[1%] h-[0.5px] w-full bg-neutral-300" />
                    <div
                      className="flex cursor-pointer items-center gap-3"
                      onClick={() => setSelectedBooking(booking.id!)} // Set the selected booking
                    >
                      <div
                        className="h-[5rem] w-[5rem] rounded-2xl bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${findRoomImage[0]})` }}
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
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Detail View */}
          {selectedBooking && (
            <PastTrips
              bookingId={selectedBooking}
              bookings={bookings}
              rooms={rooms}
              gallery={gallery}
              handleBack={handleBack}
              hosts={hosts}
            />
          )}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default Bookings;
