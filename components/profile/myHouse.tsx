"use client";

import { GalleryTypes, RoomsType } from "@/lib/actions/place.actions";
import Link from "next/link";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Button } from "../ui/button";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import axios from "axios";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import { useRouter } from "next/navigation";

type myHouseProps = {
  selectedHouse: string;
  handleBack: () => void;
  ownHouses: RoomsType[];
  savedImages: string[][];
};

const MyHouse = ({
  selectedHouse,
  savedImages,
  handleBack,
  ownHouses,
}: myHouseProps) => {
  const findMyHouse = ownHouses.find((house) => house.id === selectedHouse);
  const [open, setOpen] = useState(false);
  const [...roomImages] = savedImages;
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/auth/addRoom?roomId=${selectedHouse}`);
      toast.success("Room deleted successfully", { position: "top-center" });
      handleBack();
      setOpen(false);

      // Refresh the session and page for instant UX
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error("Error deleting room:", error);
      toast.error("Failed to delete room", { position: "top-center" });
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={handleBack}
        className="mb-2 self-start text-blue-500 underline"
      >
        ← Back to list
      </button>

      <div className="flex h-full w-full justify-center">
        <div className="h-full w-full max-w-[600px] sm:max-w-[700px] md:max-w-[800px] lg:max-w-[420px]">
          <Carousel className="w-full">
            <CarouselContent>
              {roomImages[0].map((imageSet, index) => (
                <CarouselItem key={index}>
                  <div
                    style={{ backgroundImage: `url(${imageSet})` }}
                    className="relative h-[13rem] w-full overflow-hidden rounded-xl bg-cover bg-center bg-no-repeat sm:h-[300px] md:h-[350px] lg:h-[250px]"
                  ></div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="top-1/2 -left-4 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 shadow backdrop-blur-sm" />
            <CarouselNext className="top-1/2 -right-4 h-8 w-8 -translate-y-1/2 cursor-pointer rounded-full bg-white/80 shadow backdrop-blur-sm" />
          </Carousel>
        </div>
      </div>

      <div className="flex flex-col items-start">
        <p className="mb-2 text-xl font-bold">{findMyHouse?.roomDescription}</p>
        <p>
          <span className="font-bold">Location:</span>{" "}
          {findMyHouse?.roomLocation}
        </p>
        <p>
          <span className="font-bold">Price:</span> £{findMyHouse?.roomPrice}
        </p>
        <p>
          <span className="font-bold">Type:</span> {findMyHouse?.roomType}
        </p>

        <div className="mt-[2%] flex w-full items-center justify-between">
          <Link
            href={`/room/${findMyHouse?.id}`}
            className="text-blue-500 underline"
          >
            See room
          </Link>

          <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="cursor-pointer">
                Delete Room
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this room from your listings.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction
                  className="cursor-pointer bg-red-500 hover:bg-red-600"
                  onClick={handleDelete}
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
};

export default MyHouse;
