// pages/api/roles/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import prisma from '@/prisma/client';

export const roleSchema = z.object({
  name: z.string().min(1, 'Role name cannot be empty'),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = roleSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newRole = await prisma.role.create({
    data: {
      name: body.name,
    },
  });

  return NextResponse.json(newRole, { status: 201 });
}

export async function GET() {
  const roles = await prisma.role.findMany();
  return NextResponse.json(roles, { status: 200 });
}
