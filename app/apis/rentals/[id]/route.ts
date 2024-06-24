import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { rentalSchema } from "@/app/schemas";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rental = await prisma.rental.findUnique({
    where: { userId: Number(params.id) },
    include: {
      user: true,
    },
  });

  if (!rental) {
    return NextResponse.json({ error: "rental not found" }, { status: 404 });
  }

  return NextResponse.json(rental, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const rental = await prisma.rental.findUnique({
    where: { id: Number(params.id) },
    include: {
      user: true,
    },
  });

  const newRental = {
    name: body.name || rental?.user.name,
    phoneNumber: body.phoneNumber || rental?.user.phoneNumber,
    password: body.password || rental?.user.password,
    location: body.location || rental?.location,
    status: body.status || rental?.status,
    image_url: body.image_url || rental?.image_url,
  };

  const validation = rentalSchema.safeParse(newRental);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: rental?.userId },
    data: {
      name: newRental.name,
      phoneNumber: newRental.phoneNumber,
      password: newRental.password,
    },
  });

  const updatedRental = await prisma.rental.update({
    where: { id: rental?.id },
    data: {
      location: newRental.location,
      status: newRental.status,
      image_url: newRental.image_url,
    },
  });

  return NextResponse.json(updatedRental, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rental = await prisma.rental.findUnique({
    where: { id: Number(params.id) },
  });

  await prisma.rental.delete({
    where: { id: Number(params.id) },
  });
  await prisma.user.delete({
    where: { id: rental?.userId },
  });
  return NextResponse.json(
    { message: "rental deleted successfully" },
    { status: 200 }
  );
}
