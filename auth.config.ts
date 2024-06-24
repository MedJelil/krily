// auth.config.ts
import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/Login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const roleId = auth?.user?.roleId;
      const pathname = nextUrl.pathname;

      // console.log(`User role: ${auth?.user}`);

      // Redirect based on roleId
      if (isLoggedIn) {
        if (pathname === "/Login" || pathname === "/") {
          if (roleId === 1) {
            return Response.redirect(new URL("/admin", nextUrl));
          } else if (roleId === 2) {
            return Response.redirect(new URL("/user/cars", nextUrl));
          } else if (roleId === 3) {
            return Response.redirect(new URL("/rental", nextUrl));
          }
        }

        // Protect routes based on role
        if (
          (roleId === 1 && pathname.startsWith("/admin")) ||
          (roleId === 2 && pathname.startsWith("/user")) ||
          (roleId === 3 && pathname.startsWith("/rental"))
        ) {
          return true;
        }

        return Response.redirect(new URL("/not-found", nextUrl));
      }

      return pathname === "/Login";
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.phoneNumber = user.phoneNumber;
        token.roleId = user.roleId;
      }
      return token;
    },
    session: async ({ session, token }) => {
      if (token) {
        session.user.id = `${token.id}`;
        session.user.name = `${token.name}`;
        session.user.phoneNumber = `${token.phoneNumber}`;
        session.user.roleId = parseInt(`${token.roleId}`);
      }
      return session;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;
