import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { rentalSchema } from "../route";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

//   if (!params.id) {
//     return NextResponse.json({ error: "ID is required" }, { status: 400 });
//   }

  const rental = await prisma.rental.findUnique({
    where: { id: Number(params.id) },
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

  const updatedRental = await prisma.rental.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      phoneNumber: body.phoneNumber,
      password: body.password,
      location: body.location 
    },
  });

  return NextResponse.json(updatedRental, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

//   if (!params.id) {
//     return NextResponse.json({ error: "ID is required" }, { status: 400 });
//   }

  await prisma.rental.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(
    { message: "rental deleted successfully" },
    { status: 200 }
  );
}
