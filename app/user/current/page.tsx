import Current from "@/app/components/Current";
import { auth } from "@/auth";
import React from "react";

const page = async () => {
  const session = await auth();
  if (session)
    return (
      <div>
        <Current use_for="client" userId={parseInt(session.user.id)} />
      </div>
    );
};

export default page;
