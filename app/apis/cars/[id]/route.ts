import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { carSchema } from "@/app/schemas";
// import { carSchema } from "../route";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const car = await prisma.car.findUnique({
    where: { id: Number(params.id) },
    include: {
      rental: {
        include: {
          user: true,
        },
      },
    },
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
  const body = await request.json();

  const car = await prisma.car.findUnique({
    where: { id: Number(params.id) },
  });

  const newCar = {
    model: body.model || car?.model,
    brand: body.brand || car?.brand,
    gearBox: body.gearBox || car?.gearBox,
    fuel: body.fuel || car?.fuel,
    main_image_url: body.main_image_url || car?.main_image_url,
    image1_url: body.image1_url || car?.image1_url || "",
    image2_url: body.image2_url || car?.image2_url || "",
    silenders: body.silenders || car?.silenders,
    status: body.status || car?.status,
    color: body.color || car?.color,
    year: body.year || car?.year,
    daily_price: body.daily_price || car?.daily_price,
    rentalId: body.rentalId || car?.rentalId,
  };

  const validation = carSchema.safeParse(newCar);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedCar = await prisma.car.update({
    where: { id: Number(params.id) },
    data: {
      model: newCar.model,
      brand: newCar.brand,
      gearBox: newCar.gearBox,
      fuel: newCar.fuel,
      main_image_url: newCar.main_image_url,
      image1_url: newCar.image1_url,
      image2_url: newCar.image2_url,
      silenders: newCar.silenders,
      color: newCar.color,
      status: newCar.status,
      year: newCar.year,
      daily_price: newCar.daily_price,
      rentalId: newCar.rentalId,
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
