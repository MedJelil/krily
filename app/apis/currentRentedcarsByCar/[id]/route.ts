import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const carId = Number(params.id);

  const reservedCars = await prisma.rentedCar.findMany({
    where: { carId },
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
          },
        },
      },
    },
  });

  if (reservedCars.length === 0) {
    return NextResponse.json(
      { error: "No reserved cars found for this car ID" },
      { status: 404 }
    );
  }

  const currentDateTime = new Date();
  const validReservations = reservedCars
    .filter((reservedCar) => {
      const endRentingDate = new Date(
        new Date(reservedCar.createdAt).getTime() +
          reservedCar.days * 24 * 60 * 60 * 1000
      );
      return endRentingDate > currentDateTime;
    })
    .map((reservedCar) => {
      const endRentingDate = new Date(
        new Date(reservedCar.createdAt).getTime() +
          reservedCar.days * 24 * 60 * 60 * 1000
      );
      return {
        rental_date: reservedCar.createdAt,
        end_reservation_date: endRentingDate,
      };
    });

  if (validReservations.length === 0) {
    return NextResponse.json(
      {
        error:
          "No valid reservations found with end renting date in the future",
      },
      { status: 400 }
    );
  }

  return NextResponse.json(validReservations, { status: 200 });
}
