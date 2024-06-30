// app/api/history/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { historySchema } from "@/app/schemas";

// GET route to fetch a single history entry by ID
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const historyEntry = await prisma.history.findUnique({
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

  if (!historyEntry) {
    return NextResponse.json(
      { error: "History entry not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(historyEntry, { status: 200 });
}

// PUT route to update a history entry by ID
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const historyEntry = await prisma.history.findUnique({
    where: { id: Number(params.id) },
  });

  if (!historyEntry) {
    return NextResponse.json(
      { error: "History entry not found" },
      { status: 404 }
    );
  }

  const newHistory = {
    rental_date: body.rental_date || historyEntry.rental_date,
    days: body.days || historyEntry.days,
    clientId: body.clientId || historyEntry.clientId,
    carId: body.carId || historyEntry.carId,
  };

  const validation = historySchema.safeParse(newHistory);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedHistory = await prisma.history.update({
    where: { id: Number(params.id) },
    data: {
      rental_date: new Date(newHistory.rental_date),
      days: newHistory.days,
      clientId: newHistory.clientId,
      carId: newHistory.carId,
    },
  });

  return NextResponse.json(updatedHistory, { status: 200 });
}

// DELETE route to delete a history entry by ID
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.history.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(
    { message: "History entry deleted successfully" },
    { status: 200 }
  );
}
