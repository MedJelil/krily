import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";


export const carSchema = z.object({
  model: z.string().min(1, "Model name is required."),
  brand: z.string().min(1, "Brand name is required."),
  gearBox: z.string().min(1, "Gearbox type is required."),
  fuel: z.string().min(1, "Fuel type is required."),
  // status: z.enum(['VERIFIED', 'IN_PROGRESS', 'NOT_VERIFIED', 'BLOCKED']),
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

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = carSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newCar = await prisma.car.create({
    data: {
      model: body.model,
      brand: body.brand,
      gearBox: body.gearBox,
      fuel: body.fuel,
      main_image_url: body.main_image_url,
      image1_url: body.image1_url || "",
      image2_url: body.image2_url || "",
      silenders: body.silenders,
      color: body.color,
      year: body.year,
      daily_price: body.daily_price,
      rentalId: body.rentalId,
    },
  });

  return NextResponse.json(newCar, { status: 201 });
}

export async function GET() {
  const cars = await prisma.car.findMany();
  return NextResponse.json(cars, { status: 200 });
}
