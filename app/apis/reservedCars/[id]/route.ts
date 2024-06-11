import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { reservedCarSchema } from "../route";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

  // if (!params.id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }

  const reservedCar = await prisma.reservedCar.findUnique({
    where: { id: Number(params.id) },
    include: {
      user: true,
      car: true,
    },
  });

  if (!reservedCar) {
    return NextResponse.json(
      { error: "reservedCar not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(reservedCar, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;
  const body = await request.json();
  
  const reservedCar = await prisma.reservedCar.findUnique({
    where: { id: Number(params.id) },
    include: {
      user: true,
      car: true,
    },
  });
  const newReservedCar = {
    days: body.days || reservedCar?.days,
    userId: body.userId || reservedCar?.userId,
    carId: body.carId || reservedCar?.carId,
    status: body.status || reservedCar?.status,
    car: body.car || reservedCar?.car,
    user: body.user || reservedCar?.user,
    rental_date: body.rental_date || reservedCar?.rental_date.toISOString(),
    end_reservation_date: body.end_reservation_date || reservedCar?.end_reservation_date.toISOString(),
  }
  const validation = reservedCarSchema.safeParse(newReservedCar);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedReservedCar = await prisma.reservedCar.update({
    where: { id: Number(params.id) },
    data: {
      days: newReservedCar.days,
      userId: newReservedCar.userId,
      carId: newReservedCar.carId,
      status: newReservedCar.status,
    },
  });

  return NextResponse.json(updatedReservedCar, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

  // if (!params.id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }

  await prisma.reservedCar.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(
    { message: "reservedCar deleted successfully" },
    { status: 200 }
  );
}
