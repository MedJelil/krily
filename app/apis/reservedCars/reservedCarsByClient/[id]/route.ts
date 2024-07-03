import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const reservedCars = await prisma.reservedCar.findMany({
    where: { client: { user: { id: Number(params.id) } } },
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
  return NextResponse.json(reservedCars, { status: 200 });
}
