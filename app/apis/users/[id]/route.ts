import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import z from 'zod';

const prisma = new PrismaClient();

const userSchema = z.object({
  name: z.string().regex(/^[a-zA-Z\s'-]+$/, 'Invalid name. Only alphabets allowed.'),
  phoneNumber: z.string().regex(/^[234]\d{7}$/, 'Invalid telephone number.'),
  password: z.string().regex(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 'Password must be at least 8 characters long and include both letters and numbers.'),
  image_url: z.string().optional(),
  permis: z.string().optional(),
  identity: z.string().optional(),
});

export async function GET(request: NextRequest, {params} : {params: {id: string}}) {
  // const { id } = request.query;

  if (!params.id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { id: Number(params.id) },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json(user, { status: 200 });
}

export async function PUT(request: NextRequest, {params} : {params: {id: string}}) {
  // const { id } = request.query;
  const body = await request.json();
  const validation = userSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: Number(params.id) },
    data: {
      name: body.name,
      phoneNumber: body.phoneNumber,
      password: body.password,
      image_url: body.image_url || '',
      permis: body.permis || '',
      identity: body.identity || '',
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(request: NextRequest, {params} : {params: {id: string}}) {
  // const { id } = request.query;

  if (!params.id) {
    return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  }

  await prisma.user.delete({
    where: { id: Number(params.id) },
  });

  return NextResponse.json({ message: 'User deleted successfully' }, { status: 200 });
}
