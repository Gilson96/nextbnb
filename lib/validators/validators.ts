import z from "zod";

// Schema for signing users in
export const signInFormSchema = z.object({
  email: z.string().email("invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const roomSchema = z.object({
  id: z.string().optional(),
  roomDescription: z.string().min(5, "Description is too short"),
  roomType: z.string().min(3, "Type is required"),
  roomLatitude: z.coerce.number().min(-90).max(90),
  roomLongitude: z.coerce.number().min(-180).max(180),
  roomLocation: z.string().min(2, "Location is required"),
  roomPrice: z.coerce.number().min(20, "Price must be at least 20"),
  roomAbout: z.string().min(10, "About section is too short"),
  roomAmenities: z
    .array(z.string().min(2))
    .min(3, "At least 3 amenities are required"),
  hostId: z.string(),
  gallery: z
    .array(
      z
        .instanceof(File)
        .refine(
          (file) => file.size <= 5 * 1024 * 1024,
          "File size must be less than 5MB",
        ),
    )
    .min(1, "At least one picture is required")
    .max(3, "You can upload up to 3 images only"),
});
