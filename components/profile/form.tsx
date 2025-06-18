import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import z from "zod";
import { roomSchema } from "@/lib/validators/validators";
import { Label } from "@/components/ui/label";

type RoomInput = z.infer<typeof roomSchema>;

const Form = ({ hostId }: { hostId: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control
  } = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: { hostId, gallery: [] },
  });
  const onSubmit = async (data: RoomInput) => {
    try {
      const response = await axios.post("/api/auth/addRoom", data);
      toast("Room added succesfully");
      reset();
    } catch (error) {
      console.error("Error adding room:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-[3%] h-[15rem] lg:h-[20rem] space-y-4 overflow-hidden overflow-y-auto"
    >
      <Label htmlFor="roomDescription">Room descripton</Label>
      <Input
        {...register("roomDescription")}
        placeholder="Single room in Oldham"
      />
      {errors.roomDescription && (
        <p className="text-red-500">{errors.roomDescription.message}</p>
      )}

      <Label htmlFor="roomType">Room Type</Label>
      <Input {...register("roomType")} placeholder="Single room" />
      {errors.roomType && (
        <p className="text-red-500">{errors.roomType.message}</p>
      )}

      <Label htmlFor="roomLatitude">Room Latitude</Label>
      <Input
        type="number"
        {...register("roomLatitude")}
        placeholder="53.565423"
      />
      {errors.roomLatitude && (
        <p className="text-red-500">{errors.roomLatitude.message}</p>
      )}

      <Label htmlFor="roomLongitude">Room Longitude</Label>
      <Input
        type="number"
        {...register("roomLongitude")}
        placeholder="-2.191837"
      />
      {errors.roomLongitude && (
        <p className="text-red-500">{errors.roomLongitude.message}</p>
      )}

      <Label htmlFor="roomLocation">Room Location</Label>
      <Input {...register("roomLocation")} placeholder="Oldham" />
      {errors.roomLocation && (
        <p className="text-red-500">{errors.roomLocation.message}</p>
      )}

      <Label htmlFor="roomPrice">Room Price</Label>
      <Input type="number" {...register("roomPrice")} placeholder="115" />
      {errors.roomPrice && (
        <p className="text-red-500">{errors.roomPrice.message}</p>
      )}

      <Label htmlFor="roomAbout">Room About</Label>
      <Textarea
        {...register("roomAbout")}
        placeholder="Enjoy a comfortable single room..."
      />
      {errors.roomAbout && (
        <p className="text-red-500">{errors.roomAbout.message}</p>
      )}

      <Label htmlFor="gallery">Room Gallery</Label>
      <Controller
        control={control}
        name="gallery"
        render={({ field }) => (
          <input
            type="file"
            multiple
            accept="image/*"
            className="cursor-pointer"
            onChange={(e) => {
              const files = e.target.files;
              if (!files) return;
              field.onChange(Array.from(files)); // <-- just an array of File
            }}
          />
        )}
      />
       {errors.gallery && (
        <p className="text-red-500">{errors.gallery.message}</p>
      )}

      <Button type="submit" className="cursor-pointer" disabled={isSubmitting}>
        {isSubmitting ? "Submitting..." : "Add Room"}
      </Button>
    </form>
  );
};

export default Form;
