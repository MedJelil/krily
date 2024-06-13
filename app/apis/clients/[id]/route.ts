import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { clientSchema } from "../route";

const prisma = new PrismaClient();

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

  // if (!params.id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }

  const client = await prisma.client.findUnique({
    where: { id: Number(params.id) },
  });

  if (!client) {
    return NextResponse.json({ error: "client not found" }, { status: 404 });
  }

  return NextResponse.json(client, { status: 200 });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;
  const body = await request.json();
  const validation = clientSchema.safeParse(body);

  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const client = await prisma.client.findUnique({
    where: { id: Number(params.id) },
  });

  const updatedUser = await prisma.user.update({
    where: { id: client?.userId },
    data: {
      name: body.name,
      phoneNumber: body.phoneNumber,
      password: body.password,
    },
  });
  const updatedclient = await prisma.client.update({
    where: { id: Number(params.id) },
    data: {
      image_url: body.image_url || "",
      permis: body.permis || "",
      identity: body.identity || "",
    },
  });

  return NextResponse.json(updatedclient, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  // const { id } = request.query;

  // if (!params.id) {
  //   return NextResponse.json({ error: 'ID is required' }, { status: 400 });
  // }

  const client = await prisma.client.findUnique({
    where: { id: Number(params.id) },
  });

  await prisma.client.delete({
    where: { id: Number(params.id) },
  });
  await prisma.user.delete({
    where: { id: client?.userId },
  });

  return NextResponse.json(
    { message: "client deleted successfully" },
    { status: 200 }
  );
}
