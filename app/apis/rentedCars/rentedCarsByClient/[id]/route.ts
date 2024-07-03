import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rentedCars = await prisma.rentedCar.findMany({
    where: { client: { user: { id: Number(params.id) } } },
    // where: { clientId: Number(params.id) },
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
