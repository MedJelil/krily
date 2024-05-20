
import { NextRequest, NextResponse } from 'next/server';
import z from 'zod';
import prisma from '@/prisma/client';

export const rentalSchema = z.object({
  name: z.string().regex(/^[a-zA-Z\s'-]+$/, 'Invalid name. Only alphabets allowed.'),
  phoneNumber: z.string().regex(/^[234]\d{7}$/, 'Invalid telephone number.'),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and include both letters and numbers.'),
  location: z.string(),

});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = rentalSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newRental = await prisma.rental.create({
    data: {
      name: body.name,
      phoneNumber: body.phoneNumber,
      password: body.password,
      location: body.location 

    },
  });

  return NextResponse.json(newRental, { status: 201 });
}

export async function GET() {
  const rentals = await prisma.rental.findMany();
  return NextResponse.json(rentals, { status: 200 });
}
