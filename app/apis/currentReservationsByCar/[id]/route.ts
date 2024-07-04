import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const reservedCar = await prisma.reservedCar.findMany({
    where: {
      carId: Number(params.id),
      end_reservation_date: {
        gt: new Date(),
      },
    },
    select: {
      rental_date: true,
      end_reservation_date: true,
    },
  });

  if (reservedCar.length === 0) {
    return NextResponse.json(
      { error: "No reservedCars found with end_reservation_date > now" },
      { status: 404 }
    );
  }

  return NextResponse.json(reservedCar, { status: 200 });
}
