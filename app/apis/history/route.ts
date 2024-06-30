// app/api/history/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { historySchema } from "@/app/schemas";

// POST route to create a new history entry
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = historySchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newHistory = await prisma.history.create({
    data: {
      rental_date: new Date(body.rental_date),
      days: body.days,
      clientId: body.clientId,
      carId: body.carId,
    },
  });

  return NextResponse.json(newHistory, { status: 201 });
}

// GET route to fetch all history entries
export async function GET() {
  const historyEntries = await prisma.history.findMany({
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
  return NextResponse.json(historyEntries, { status: 200 });
}
