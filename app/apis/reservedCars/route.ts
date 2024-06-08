import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";

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
  userId: z
    .number()
    .int()
    .positive("User ID must be a positive integer representing a valid user."),
  carId: z
    .number()
    .int()
    .positive("Car ID must be a positive integer representing a valid user."),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = reservedCarSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  
  const newReservedCar = await prisma.reservedCar.create({
    data: {
      rental_date: body.rental_date,
      end_reservation_date: body.end_reservation_date,
      days: body.days,
      userId: body.userId,
      carId: body.carId,
    },
  });

  return NextResponse.json(newReservedCar, { status: 201 });
}

export async function GET() {
  const reservedCars = await prisma.reservedCar.findMany();
  return NextResponse.json(reservedCars, { status: 200 });
}
