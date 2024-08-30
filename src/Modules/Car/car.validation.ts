import { z } from "zod";

export const CarStatusSchema = z.enum(["available", "unavailable"]);

export const CarSchema = z.object({
  name: z.string().nonempty("Name is required"),
  description: z.string().nonempty("Description is required"),
  color: z.string().nonempty("Color is required"),
  isElectric: z.boolean(),
  status: CarStatusSchema,
  features: z.array(z.string().nonempty("Feature cannot be empty")),
  photoUrl: z.string(),

  pricePerHour: z.number().positive("Price per hour must be a positive number"),
  isDeleted: z.boolean(),
});

export type Car = z.infer<typeof CarSchema>;
