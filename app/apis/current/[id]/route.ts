// app/api/current/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { currentSchema } from "@/app/schemas";

// GET route to fetch a single current entry by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const currentEntry = await prisma.current.findUnique({
    where: { id: Number(params.id) },
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
          }, // Include the rental attribute
        },
      },
    },
  });

  if (!currentEntry) {
    return NextResponse.json(
      { error: "Current entry not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(currentEntry, { status: 200 });
}

// PUT route to update a current entry by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const currentEntry = await prisma.current.findUnique({
    where: { id: Number(params.id) },
  });

  if (!currentEntry) {
    return NextResponse.json(
      { error: "Current entry not found" },
      { status: 404 }
    );
  }

  const newCurrent = {
    rental_date: body.rental_date || currentEntry.rental_date,
    days: body.days || currentEntry.days,
    clientId: body.clientId || currentEntry.clientId,
    carId: body.carId || currentEntry.carId,
  };

  const validation = currentSchema.safeParse(newCurrent);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedCurrent = await prisma.current.update({
    where: { id: Number(params.id) },
    data: {
      rental_date: new Date(newCurrent.rental_date),
      days: newCurrent.days,
      clientId: newCurrent.clientId,
      carId: newCurrent.carId,
    },
  });

  return NextResponse.json(updatedCurrent, { status: 200 });
}

// DELETE route to delete a current entry by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.current.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(
    { message: "Current entry deleted successfully" },
    { status: 200 }
  );
}
