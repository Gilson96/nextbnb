import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import axios from "axios";
import z from "zod";
import { roomSchema } from "@/lib/validators/validators";
import { Label } from "@/components/ui/label";
import { FormInput } from "./formInput";
import { useState } from "react";

type RoomInput = z.infer<typeof roomSchema>;

const Form = ({ hostId }: { hostId: string }) => {
  const [uploading, setUploading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    control,
  } = useForm({
    resolver: zodResolver(roomSchema),
    defaultValues: {
      hostId,
      gallery: [],
    },
  });

  // Cloudinary upload function
  const uploadImageToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      `${process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}`,
    );

    try {
      const res = await axios.post(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        formData,
      );
      return res.data.secure_url as string;
    } catch (error) {
      console.error("Cloudinary upload error:", error);
      throw new Error("Image upload failed");
    }
  };

  const onSubmit = async (data: RoomInput) => {
    try {
      setUploading(true);

      // Upload each image to Cloudinary and collect their URLs
      const galleryUrls = [];
      for (const file of data.gallery) {
        if (file) {
          const url = await uploadImageToCloudinary(file as File);
          galleryUrls.push(url);
        }
      }

      // Send the form data along with Cloudinary image URLs to the server
      await axios.post("/api/auth/addRoom", {
        ...data,
        gallery: galleryUrls,
        placeName: data.roomLocation, // You had this in your original code
      });

      toast("Room added successfully", { position: "top-center" });
      reset();
    } catch (error) {
      console.error("Error adding room:", error);
      toast.error("Failed to add room");
    } finally {
      setUploading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-[3%] h-[15rem] space-y-4 overflow-y-auto lg:h-[20rem]"
    >
      <FormInput
        label="Room Description"
        register={register}
        name="roomDescription"
        placeholder="Single room in Oldham"
        error={errors.roomDescription}
      />

      <FormInput
        label="Room Type"
        register={register}
        name="roomType"
        placeholder="Single room"
        error={errors.roomType}
      />

      <FormInput
        label="Room Latitude"
        register={register}
        name="roomLatitude"
        type="number"
        step="any"
        placeholder="53.565423"
        error={errors.roomLatitude}
      />

      <FormInput
        label="Room Longitude"
        register={register}
        name="roomLongitude"
        type="number"
        step="any"
        placeholder="-2.191837"
        error={errors.roomLongitude}
      />

      <FormInput
        label="Room Location"
        register={register}
        name="roomLocation"
        placeholder="Oldham"
        error={errors.roomLocation}
      />

      <FormInput
        label="Room Price"
        register={register}
        name="roomPrice"
        type="number"
        placeholder="115"
        error={errors.roomPrice}
      />

      <div>
        <Label htmlFor="roomAbout">Room About</Label>
        <Textarea
          {...register("roomAbout")}
          placeholder="Enjoy a comfortable single room..."
        />
        {errors.roomAbout && (
          <p className="text-red-500">{errors.roomAbout.message}</p>
        )}
      </div>

      {[0, 1, 2].map((index) => (
        <div key={index}>
          <Label htmlFor={`gallery-${index}`}>Room Image {index + 1}</Label>
          <Controller
            control={control}
            name={`gallery.${index}`}
            render={({ field }) => (
              <input
                type="file"
                accept="image/*"
                className="cursor-pointer"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    field.onChange(e.target.files[0]);
                  }
                }}
              />
            )}
          />
          {errors.gallery?.[index] && (
            <p className="text-red-500">{errors.gallery[index]?.message}</p>
          )}
        </div>
      ))}

      <Button
        type="submit"
        className="cursor-pointer"
        disabled={isSubmitting || uploading}
      >
        {isSubmitting || uploading ? "Submitting..." : "Add Room"}
      </Button>
    </form>
  );
};

export default Form;
