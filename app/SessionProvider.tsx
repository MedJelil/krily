"use client"

import { SessionProvider } from "next-auth/react"
import { Session } from "next-auth";
interface MyProps {
  /** The text to display inside the button */
  /** Whether the button can be interacted with */
  session:Session|null
  children: React.ReactNode;
}


const Provider = ({children,session}:MyProps) => {
  return (
  <SessionProvider session={session}>
    {children}
  </SessionProvider>
  )
}

export default Provider