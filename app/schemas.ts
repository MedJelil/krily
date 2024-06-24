import { z } from "zod";

export const adminSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid name. Only alphabets allowed."),
  phoneNumber: z.string().regex(/^[234]\d{7}$/, "Invalid telephone number."),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and include both letters and numbers."
    ),
});

export const carSchema = z.object({
  model: z.string().min(1, "Model name is required."),
  brand: z.string().min(1, "Brand name is required."),
  gearBox: z.string().min(1, "Gearbox type is required."),
  fuel: z.string().min(1, "Fuel type is required."),
  status: z
    .enum([
      "VERIFIED",
      "IN_PROGRESS",
      "NOT_VERIFIED",
      "BLOCKED",
      "COMPLETED",
      "RENTED",
    ])
    .optional(),
  main_image_url: z.string().url("Main image is required."),
  image1_url: z.string().optional(),
  image2_url: z.string().optional(),
  silenders: z.number().int().min(1, "Sylinder count must be at least 1."),
  color: z.string().min(1, "Car color is required."),
  year: z
    .number()
    .int()
    .min(1900, "Year must be after 1900.")
    .max(new Date().getFullYear(), "Year cannot be in the future."),
  daily_price: z.number().min(0, "Daily price must be a non-negative number."),
  rentalId: z.number().int().min(0, "Rental ID is required."),
});

export const clientSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid name. Only alphabets allowed."),
  phoneNumber: z.string().regex(/^[234]\d{7}$/, "Invalid telephone number."),
  status: z
    .enum(["VERIFIED", "IN_PROGRESS", "NOT_VERIFIED", "BLOCKED"])
    .optional(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and include both letters and numbers."
    ),
  image_url: z.string().optional(),
  permis: z.string().optional(),
  identity: z.string().optional(),
});

export const rentalSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid name. Only alphabets allowed."),
  phoneNumber: z.string().regex(/^[234]\d{7}$/, "Invalid telephone number."),
  status: z
    .enum(["VERIFIED", "IN_PROGRESS", "NOT_VERIFIED", "BLOCKED"])
    .optional(),
  image_url: z.string().optional(),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and include both letters and numbers."
    ),
  location: z.string(),
});

export const rentedCarSchema = z.object({
  days: z
    .number()
    .int()
    .min(
      1,
      "Days must be at least 1, indicating the car is rented for at least one day."
    ),
  clientId: z
    .number()
    .int()
    .positive("User ID must be a positive integer representing a valid user."),
  carId: z
    .number()
    .int()
    .positive("Car ID must be a positive integer representing a valid user."),
  status: z.string().optional(),
});

export const reservedCarSchema = z.object({
  rental_date: z.string().min(1, "you must enter the reservation date"),
  end_reservation_date: z
    .string()
    .min(1, "you must enter the end reservation date"),
  days: z
    .number()
    .int()
    .min(
      1,
      "Days must be at least 1 to indicate the car is reserved for at least one day."
    ),
  clientId: z
    .number()
    .int()
    .positive("User ID must be a positive integer representing a valid user."),
  carId: z
    .number()
    .int()
    .positive("Car ID must be a positive integer representing a valid user."),
  status: z.string().optional(),
});

export const roleSchema = z.object({
  name: z.string().min(1, "Role name cannot be empty"),
});

export const userSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid name. Only alphabets allowed."),
  phoneNumber: z.string().regex(/^[234]\d{7}$/, "Invalid telephone number."),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and include both letters and numbers."
    ),
  roleId: z.number().optional(),
});
