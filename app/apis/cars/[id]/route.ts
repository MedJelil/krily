import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { carSchema } from "../route";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

  //   if (!params.id) {
  //     return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  //   }

  const car = await prisma.car.findUnique({
    where: { id: Number(params.id) },
  });

  if (!car) {
    return NextResponse.json({ error: "car not found" }, { status: 404 });
  }

  return NextResponse.json(car, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;
  const body = await request.json();
  const validation = carSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedCar = await prisma.car.update({
    where: { id: Number(params.id) },
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

  return NextResponse.json(updatedCar, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

  //   if (!params.id) {
  //     return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  //   }

  await prisma.car.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(
    { message: "car deleted successfully" },
    { status: 200 }
  );
}
