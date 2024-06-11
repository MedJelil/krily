import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { rentedCarSchema } from "../route";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

  // if (!params.id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }

  const rentedCar = await prisma.rentedCar.findUnique({
    where: { id: Number(params.id) },
    include: {
      user: true,
      car: true,
    },
  });

  if (!rentedCar) {
    return NextResponse.json({ error: "rentedCar not found" }, { status: 404 });
  }

  return NextResponse.json(rentedCar, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;
  const body = await request.json();

  const rentedCar = await prisma.rentedCar.findUnique({
    where: { id: Number(params.id) },
    include: {
      user: true,
      car: true,
    },
  });
  const newRentedCar = {
    days: body.days || rentedCar?.days,
    userId: body.userId || rentedCar?.userId,
    carId: body.carId || rentedCar?.carId,
    status: body.status || rentedCar?.status,
    car: body.car || rentedCar?.car,
    user: body.user || rentedCar?.user,
  };

  const validation = rentedCarSchema.safeParse(newRentedCar);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedRentedCar = await prisma.rentedCar.update({
    where: { id: Number(params.id) },
    data: {
      days: newRentedCar.days,
      userId: newRentedCar.userId,
      carId: newRentedCar.carId,
      status: newRentedCar.status,
    },
  });

  return NextResponse.json(updatedRentedCar, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

  // if (!params.id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }

  await prisma.rentedCar.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(
    { message: "rentedCar deleted successfully" },
    { status: 200 }
  );
}
