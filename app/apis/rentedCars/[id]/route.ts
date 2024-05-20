import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { rentedCarSchema } from '../route';

const prisma = new PrismaClient();


export async function GET(request: NextRequest, {params} : {params: {id: string}}) {
  // const { id } = request.query;

  // if (!params.id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }

  const rentedCar = await prisma.rentedCar.findUnique({
    where: { id: Number(params.id) },
  });

  if (!rentedCar) {
    return NextResponse.json({ error: 'rentedCar not found' }, { status: 404 });
  }

  return NextResponse.json(rentedCar, { status: 200 });
}

export async function PUT(request: NextRequest, {params} : {params: {id: string}}) {
  // const { id } = request.query;
  const body = await request.json(); 
  const validation = rentedCarSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedRentedCar = await prisma.rentedCar.update({
    where: { id: Number(params.id) },
    data: {
        days: body.days,
        userId: body.userId,
        carId: body.carId,
    },
  });

  return NextResponse.json(updatedRentedCar, { status: 200 });
}

export async function DELETE(request: NextRequest, {params} : {params: {id: string}}) {
  // const { id } = request.query;

  // if (!params.id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }

  await prisma.rentedCar.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: 'rentedCar deleted successfully' }, { status: 200 });
}
