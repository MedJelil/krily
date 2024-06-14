import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import prisma from "./prisma/client";
import { NextResponse } from "next/server";


async function getUser(phoneNumber: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { phoneNumber: phoneNumber },
    });
    return user;
  } catch (error) {
    console.error("Failed to fetch user:", error);
    throw new Error("Failed to fetch user.");
  }
}

export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<any> {
        const parsedCredentials = z
          .object({ phoneNumber: z.string(), password: z.string() })
          .safeParse(credentials);

          if (parsedCredentials.success) {
            const { phoneNumber, password } = parsedCredentials.data;
            const user = await getUser(phoneNumber);
            if (!user) return null;
            // const passwordsMatch = await bcrypt.compare(password, user.password);
 
          if (password == user.password) return user;
          }
          console.log('Invalid credentials');
          return null;
      },
    }),
  ],
});

// import type { NextAuthConfig } from "next-auth";
// import NextAuth from "next-auth";
// import CredentialsProvider from "next-auth/providers/credentials";

// const credentialsconfig = CredentialsProvider({
//   name: "Credentials",
//   credentials: {
//     phoneNumber: {
//       label: "phoneNumber",
//       //   placeholder: "Enter your phone number",
//     },
//     password: {
//       label: "Password",
//       type: "password",
//       //   placeholder: "Enter your password",
//     },
//   },
//   async authorize(credentials) {
//     if (credentials.phoneNumber == "2205" && credentials.password == "0000")
//       return {
//         name: "jelil",
//       };
//     else return null;
//   },
// });

// const config = {
//   providers: [credentialsconfig],
// } satisfies NextAuthConfig;

// export const { handlers, auth, signIn, signOut } = NextAuth(config);
