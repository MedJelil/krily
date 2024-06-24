import ClientForm from "@/app/components/ClientForm";
import { auth } from "@/auth";
import prisma from "@/prisma/client";
import React from "react";

const page = async () => {
  const session = await auth();
  const client = await prisma.client.findUnique({
    where: {
      userId: Number(session?.user.id),
    },
    include: {
      user: true,
    },
  });

  if (client) {
    const clientData = {
      id: client.id,
      name: client.user.name,
      phoneNumber: client.user.phoneNumber,
      image_url: client.image_url,
      permis: client.permis,
      identity: client.identity,
    };
    return (
      <div>
        <ClientForm clientData={clientData} />
      </div>
    );
  }
};

export default page;
