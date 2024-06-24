import React from "react";
import Services from "../components/Services";
import Charts from "../components/Charts";
import { auth } from "@/auth";

const page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  if (userId)
    return (
      <div className="flex flex-col gap-9 ">
        <Services use_for="rental" />
        <Charts use_for="rental" userId={+userId} />
        {/* {userId} */}
      </div>
    );
};

export default page;
