import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";
import { carSchema } from "@/app/schemas";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = carSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newCar = await prisma.car.create({
    data: {
      model: body.model,
      brand: body.brand,
      gearBox: body.gearBox,
      fuel: body.fuel,
      main_image_url: body.main_image_url,
      image1_url: body.image1_url || "",
      image2_url: body.image2_url || "",
      silenders: body.silenders,
      color: body.color,
      year: body.year,
      daily_price: body.daily_price,
      rentalId: body.rentalId,
    },
  });

  return NextResponse.json(newCar, { status: 201 });
}

export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const query = url.searchParams.get("query") || "";

  const cars = await prisma.car.findMany({
    where: {
      OR: [{ model: { contains: query } }, { brand: { contains: query } }],
    },
    include: {
      rental: {
        include: {
          user: true,
        },
      },
    },
  });
  return NextResponse.json(cars, { status: 200 });
}
