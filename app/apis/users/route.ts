// import { NextRequest, NextResponse } from "next/server";
// import z from "zod";
// import prisma from "@/prisma/client";

// const userSchema = z.object({
//   name: z.string().regex(/^[a-zA-Z\s'-]+$/, "Nom invalide. Only alphabets"),
//   phoneNumber: z.string().regex(/^[234]\d{7}$/, "Invalid telephone number"),
//   password: z
//     .string()
//     .regex(
//       /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
//       "Password must be at least 8 characters long and include both letters and numbers."
//     ),
// });

// export async function POST(request: NextRequest) {
//   const body = await request.json();
//   const validetion = userSchema.safeParse(body);

//   if (!validetion.success)
//     return NextResponse.json(validetion.error.errors, { status: 400 });

//   const newUser = await prisma.user.create({
//     data: {
//       name: body.name,
//       phoneNumber: body.phoneNumber,
//       password: body.password,
//       image_url: body.image_url || "", // Provide default value or handle as required
//       permis: body.permis || "", // Provide default value or handle as required
//       identity: body.identity || "",
//     },
//   });
//   return NextResponse.json(newUser, { status: 201 });
// }


import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import prisma from '@/prisma/client';

const userSchema = z.object({
  name: z.string().regex(/^[a-zA-Z\s'-]+$/, 'Invalid name. Only alphabets allowed.'),
  phoneNumber: z.string().regex(/^[234]\d{7}$/, 'Invalid telephone number.'),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and include both letters and numbers.'),
  image_url: z.string().optional(),
  permis: z.string().optional(),
  identity: z.string().optional(),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newUser = await prisma.user.create({
    data: {
      name: body.name,
      phoneNumber: body.phoneNumber,
      password: body.password,
      image_url: body.image_url || '',
      permis: body.permis || '',
      identity: body.identity || '',
    },
  });

  return NextResponse.json(newUser, { status: 201 });
}

export async function GET() {
  const users = await prisma.user.findMany();
  return NextResponse.json(users, { status: 200 });
}
