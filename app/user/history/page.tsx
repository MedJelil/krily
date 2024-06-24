import History from "@/app/components/History";
import { UseCurrentUser } from "@/app/hooks/useCurrentUser";
import { auth } from "@/auth";
import React from "react";

const page = async () => {

  const session = await auth();
  if (session)
    return (
      <div>
        <History use_for="client" userId={parseInt(session.user.id)} />
      </div>
    );
};

export default page;
