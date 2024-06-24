import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";
import { rentalSchema } from "@/app/schemas";

// export const rentalSchema = z.object({
//   name: z
//     .string()
//     .regex(/^[a-zA-Z\s'-]+$/, "Invalid name. Only alphabets allowed."),
//   phoneNumber: z.string().regex(/^[234]\d{7}$/, "Invalid telephone number."),
//   status: z.enum(['VERIFIED', 'IN_PROGRESS', 'NOT_VERIFIED', 'BLOCKED']).optional(),
//   image_url: z.string().optional(),
//   password: z
//     .string()
//     .regex(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//       "Password must be at least 8 characters long and include both letters and numbers."
//     ),
//   location: z.string(),
// });

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = rentalSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  // Create a new user in the database
  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      phoneNumber: body.phoneNumber,
      password: body.password,
      roleId: 3, // 3 is the id of rental role
    },
  });

  const newRental = await prisma.rental.create({
    data: {
      userId: newUser.id,
      location: body.location,
    },
  });

  return NextResponse.json(
    {
      id: newRental.id,
      user: newUser,
      userId: newRental.id,
      location: newRental.location,
    },
    { status: 201 }
  );
}

export async function GET() {
  try {
    // Fetch all clients with their associated user data
    const rentals = await prisma.rental.findMany({
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });

    // Return the clients
    return NextResponse.json(rentals, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
