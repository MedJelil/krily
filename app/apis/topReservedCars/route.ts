import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const topReservedCars = await prisma.reservedCar.groupBy({
      by: ["carId"],
      _count: {
        carId: true,
      },
      orderBy: {
        _count: {
          carId: "desc",
        },
      },
      take: 5,
    });

    const carsWithDetails = await Promise.all(
      topReservedCars.map(async (reservedCar) => {
        const car = await prisma.car.findUnique({
          where: { id: reservedCar.carId },
        });
        return {
          name: `${car?.model} ${car?.year}`,
          count: reservedCar._count.carId,
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
