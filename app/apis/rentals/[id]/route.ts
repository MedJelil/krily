import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { rentalSchema } from "../route";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rental = await prisma.rental.findUnique({
    where: { id: Number(params.id) },
    include: {
      user: {
        include: {
          role: true,
        },
      },
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
  // const { id } = request.query;
  const body = await request.json();
  const validation = rentalSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const rental = await prisma.rental.findUnique({
    where: { id: Number(params.id) },
  });

  const updatedUser = await prisma.user.update({
    where: { id: rental?.userId },
    data: {
      name: body.name,
      phoneNumber: body.phoneNumber,
      password: body.password,
    },
  });

  const updatedRental = await prisma.rental.update({
    where: { id: rental?.id },
    data: {
      location: body.location,
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
