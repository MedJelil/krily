// app/api/current/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { currentSchema } from "@/app/schemas";

// POST route to create a new current entry
export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = currentSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newCurrent = await prisma.current.create({
    data: {
      rental_date: new Date(body.rental_date),
      days: body.days,
      clientId: body.clientId,
      carId: body.carId,
    },
  });

  return NextResponse.json(newCurrent, { status: 201 });
}

// GET route to fetch all current entries
export async function GET() {
  const currentEntries = await prisma.current.findMany({
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
  return NextResponse.json(currentEntries, { status: 200 });
}
