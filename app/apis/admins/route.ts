import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
// import bcrypt from "bcryptjs";

export const adminSchema = z.object({
  name: z
    .string()
    .regex(/^[a-zA-Z\s'-]+$/, "Invalid name. Only alphabets allowed."),
  phoneNumber: z.string().regex(/^[234]\d{7}$/, "Invalid telephone number."),
  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
      "Password must be at least 8 characters long and include both letters and numbers."
    ),
});

// POST request handler
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const validation = adminSchema.safeParse(body);

    // Validate the request body
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(body.password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        phoneNumber: body.phoneNumber,
        password: body.password,
        roleId: 1, // 1 is the id of admin role
      },
    });

    // Create a new admin in the database
    const newAdmin = await prisma.admin.create({
      data: {
        userId: newUser.id,
      },
    });

    // Return the created admin, excluding sensitive information
    return NextResponse.json(
      {
        id: newAdmin.id,
        userId: newAdmin.userId,
        name: newUser.name,
        phoneNumber: newUser.phoneNumber,
      },
      { status: 201 }
    );
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

// GET request handler
export async function GET() {
  try {
    // Fetch all admins with their associated user data
    const admins = await prisma.admin.findMany({
      include: {
        user: true,
      },
    });

    return NextResponse.json(admins, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
