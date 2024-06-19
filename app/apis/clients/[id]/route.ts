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
    where: { userId: Number(params.id) },
    include: {
      user: true,
    }
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
  const body = await request.json();

  const client = await prisma.client.findUnique({
    where: { id: Number(params.id) },
    include: {
      user: true,
    },
  });

  const newClient = {
    name: body.name || client?.user.name,
    phoneNumber: body.phoneNumber || client?.user.phoneNumber,
    password: body.password || client?.user.password,
    image_url: body.image_url || client?.image_url || "",
    permis: body.permis || client?.permis || "",
    identity: body.identity || client?.identity || "",
    status: body.status || client?.status
  };

  const validation = clientSchema.safeParse(newClient);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const updatedUser = await prisma.user.update({
    where: { id: client?.userId },
    data: {
      name: newClient.name,
      phoneNumber: newClient.phoneNumber,
      password: newClient.password,
    },
  });

  const updatedClient = await prisma.client.update({
    where: { id: Number(params.id) },
    data: {
      image_url: newClient.image_url,
      permis: newClient.permis,
      identity: newClient.identity,
      status: newClient.status,
    },
  });

  return NextResponse.json(updatedClient, { status: 200 });
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
