"use client";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import Form from "./form";

const NewPlace = ({ hostId }: { hostId: string }) => {
  return (
    <Dialog>
      <DialogTrigger className="flex h-full cursor-pointer flex-col items-center justify-center rounded-2xl border p-[5%] shadow">
        <Plus size={40} />
        <p>Add a new place</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-start">Add a new place</DialogTitle>
          <Form hostId={hostId} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default NewPlace;
