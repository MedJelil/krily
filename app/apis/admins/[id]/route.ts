import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { adminSchema } from "@/app/schemas";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await prisma.admin.findUnique({
    where: { userId: Number(params.id) },
    include: {
      user: true,
    },
  });

  if (!admin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  return NextResponse.json(admin, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const body = await request.json();

  const admin = await prisma.admin.findUnique({
    where: { id: Number(params.id) },
    include: {
      user: true,
    },
  });

  const newAdmin = {
    name: body.name || admin?.user.name,
    phoneNumber: body.phoneNumber || admin?.user.phoneNumber,
    password: body.password || admin?.user.password,
  };

  const validation = adminSchema.safeParse(newAdmin);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: admin?.userId },
    data: {
      name: newAdmin.name,
      phoneNumber: newAdmin.phoneNumber,
      password: newAdmin.password,
    },
  });

  return NextResponse.json(updatedUser, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const admin = await prisma.admin.findUnique({
    where: { id: Number(params.id) },
  });

  await prisma.admin.delete({
    where: { id: Number(params.id) },
  });
  await prisma.user.delete({
    where: { id: admin?.userId },
  });

  return NextResponse.json(
    { message: "Admin deleted successfully" },
    { status: 200 }
  );
}
