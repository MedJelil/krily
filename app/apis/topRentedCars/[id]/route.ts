import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const userId = Number(params.id);

  try {
    const topRentedCars = await prisma.rentedCar.groupBy({
      by: ["carId"],
      _count: {
        carId: true,
      },
      where: {
        car: {
          rental: {
            user: {
              id: Number(userId),
            },
          },
        },
      },
      orderBy: {
        _count: {
          carId: "desc",
        },
      },
      take: 5,
    });

    const carsWithDetails = await Promise.all(
      topRentedCars.map(async (rentedCar) => {
        const car = await prisma.car.findUnique({
          where: { id: rentedCar.carId },
        });
        return {
          name: `${car?.model} ${car?.year}`,
          count: rentedCar._count.carId,
        };
      })
    );

    return NextResponse.json(carsWithDetails, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
