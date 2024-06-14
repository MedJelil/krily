import { auth, signIn, signOut } from "@/auth";
import React from "react";

const AppBar = async () => {
  const session = await auth();
  return (
    <div>
      {session && session.user ? (
        <div>
          <p>{session.user.name}</p>
          <form action={async()=>{
            "use server"
            await signOut()
          }}>
            <button type="submit">Signout</button>
          </form>
        </div>
      ) : (
        <div>
            <form action={async()=>{
            "use server"
            await signIn()
          }}>
            <button type="submit">Sign In</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AppBar;
