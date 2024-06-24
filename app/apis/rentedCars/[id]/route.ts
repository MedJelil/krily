import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { rentedCarSchema } from "@/app/schemas";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rentedCar = await prisma.rentedCar.findUnique({
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
          },
        },
      },
    },
  });

  if (!rentedCar) {
    return NextResponse.json({ error: "rentedCar not found" }, { status: 404 });
  }

  return NextResponse.json(rentedCar, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;
  const body = await request.json();

  const rentedCar = await prisma.rentedCar.findUnique({
    where: { id: Number(params.id) },
    include: {
      client: {
        include: {
          user: true,
        },
      },
      car: true,
    },
  });
  const newRentedCar = {
    days: body.days || rentedCar?.days,
    clientId: body.clientId || rentedCar?.clientId,
    carId: body.carId || rentedCar?.carId,
    status: body.status || rentedCar?.status,
    car: body.car || rentedCar?.car,
    client: body.client || rentedCar?.client,
  };

  const validation = rentedCarSchema.safeParse(newRentedCar);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedRentedCar = await prisma.rentedCar.update({
    where: { id: Number(params.id) },
    data: {
      days: newRentedCar.days,
      clientId: newRentedCar.clientId,
      carId: newRentedCar.carId,
      status: newRentedCar.status,
    },
  });

  return NextResponse.json(updatedRentedCar, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  await prisma.rentedCar.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json(
    { message: "rentedCar deleted successfully" },
    { status: 200 }
  );
}

// this for geting rental rented cars

export async function OPTIONS(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rentedCars = await prisma.rentedCar.findMany({
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
          },
        },
      },
    },
  });

  if (!rentedCars) {
    return NextResponse.json(
      { error: "No rented cars found" },
      { status: 404 }
    );
  }

  // Filter the rentedCars based on the provided conditions
  const filteredRentedCars = rentedCars.filter(
    (rentedCar) => rentedCar.car.rental.user.id == Number(params.id)
  );

  if (filteredRentedCars.length === 0) {
    return NextResponse.json(
      { error: "No matching rented cars found" },
      { status: 404 }
    );
  }

  return NextResponse.json(filteredRentedCars, { status: 200 });
}

// this for geting client rented cars
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const rentedCars = await prisma.rentedCar.findMany({
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
          },
        },
      },
    },
  });

  if (!rentedCars) {
    return NextResponse.json(
      { error: "No rented cars found" },
      { status: 404 }
    );
  }

  // Filter the rentedCars based on the provided conditions
  const filteredRentedCars = rentedCars.filter(
    (rentedCar) => rentedCar.client.user.id == Number(params.id)
  );

  if (filteredRentedCars.length === 0) {
    return NextResponse.json(
      { error: "No matching rented cars found" },
      { status: 404 }
    );
  }

  return NextResponse.json(filteredRentedCars, { status: 200 });
}
