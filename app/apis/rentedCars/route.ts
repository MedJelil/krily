import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";
import { rentedCarSchema } from "@/app/schemas";

// export const rentedCarSchema = z.object({
//     days: z.number().int().min(1, "Days must be at least 1, indicating the car is rented for at least one day."),
//     clientId: z.number().int().positive("User ID must be a positive integer representing a valid user."),
//     carId: z.number().int().positive("Car ID must be a positive integer representing a valid user."),
//     status: z.string().optional()
//   });

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = rentedCarSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newRentedCar = await prisma.rentedCar.create({
    data: {
      days: body.days,
      clientId: body.clientId,
      carId: body.carId,
    },
  });

  return NextResponse.json(newRentedCar, { status: 201 });
}

export async function GET() {
  const rentedCars = await prisma.rentedCar.findMany({
    include: {
      client: {
        include: {
          user: true,
        },
      },
      car: {
        include: {
          rental: {
            include: {
              user: true, // Include the rental attribute
            },
          }, // Include the rental attribute
        },
      },
    },
  });
  return NextResponse.json(rentedCars, { status: 200 });
}
