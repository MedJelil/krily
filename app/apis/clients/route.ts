import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import prisma from "@/prisma/client";
import { clientSchema } from "@/app/schemas";
// import bcrypt from "bcryptjs";

// export const clientSchema = z.object({
//   name: z
//     .string()
//     .regex(/^[a-zA-Z\s'-]+$/, "Invalid name. Only alphabets allowed."),
//   phoneNumber: z.string().regex(/^[234]\d{7}$/, "Invalid telephone number."),
//   status: z.enum(['VERIFIED', 'IN_PROGRESS', 'NOT_VERIFIED', 'BLOCKED']).optional(),
//   password: z
//     .string()
//     .regex(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//       "Password must be at least 8 characters long and include both letters and numbers."
//     ),
//   image_url: z.string().optional(),
//   permis: z.string().optional(),
//   identity: z.string().optional(),
// });

// POST request handler
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body = await request.json();
    const validation = clientSchema.safeParse(body);

    // Validate the request body
    if (!validation.success) {
      return NextResponse.json(validation.error.errors, { status: 400 });
    }

    // Hash the password
    // const hashedPassword = await bcrypt.hash(body.user.password, 10);

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: {
        name: body.name,
        phoneNumber: body.phoneNumber,
        password: body.password,
        roleId: 2, // 2 is the id of client role
      },
    });

    // Create a new client in the database
    const newClient = await prisma.client.create({
      data: {
        userId: newUser.id,
        image_url: body.image_url || "",
        permis: body.permis || "",
        identity: body.identity || "",
      },
    });

    // Return the created client, excluding sensitive information
    return NextResponse.json(
      {
        id: newClient.id,
        userId: newClient.userId,
        image_url: newClient.image_url,
        permis: newClient.permis,
        identity: newClient.identity,
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
    // Fetch all clients with their associated user data
    const clients = await prisma.client.findMany({
      include: {
        user: {
          include: {
            role: true,
          },
        },
      },
    });

    // Return the clients
    return NextResponse.json(clients, { status: 200 });
  } catch (error) {
    // Handle errors
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}
