import NextAuth, { NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { findUserByEmail } from "@/app/lib/data/user/findUserByEmail";
import { links } from "@/shared/config/links";
import { User } from "@prisma/client";
import { NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/db.server";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: { id: string; name: string };
  }
}

export const authOptions = {
  secret: process.env.NextAuth_SECRET,
  providers: [
    CredentialsProvider({
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;
        const res = await fetch(links.login, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        });

        const user = (await findUserByEmail(email)) as User;

        const isPasswordCorrect = bcryptjs.compareSync(
          password,
          user?.passwordHash
        );

        if (res.ok && isPasswordCorrect) {
          console.log("Return ok");
          return user;
        } else return null;
      },
    }),
  ],
  callbacks: {
    // async jwt({ token, user }) {
    //   return { ...token, ...user };
    // },
    // async session({ session, token }) {
    //   session.user = token;
    //   return session;
    // },
    authorized({ auth, request: { nextUrl } }) {
      const { pathname, search } = nextUrl;
      const isLoggedIn = !!auth?.user;
      const isOnAuthPage =
        pathname.startsWith("/welcome") || pathname.startsWith("/auth");

      // const unProtectedPages = ['/terms', '/privacy-policy']; // Add more here if needed
      // const isOnUnprotectedPage =
      //   pathname === '/' || // The root page '/' is also an unprotected page
      //   unProtectedPages.some((page) => pathname.startsWith(page));
      // const isProtectedPage = !isOnUnprotectedPage;

      if (isOnAuthPage) {
        // Redirect to /dashboard/overview, if logged in and is on an auth page
        if (isLoggedIn)
          return NextResponse.redirect(new URL("/dashboard/overview", nextUrl));
      } else {
        // Redirect to /welcome, if not logged in but is on a protected page
        if (!isLoggedIn) {
          const from = encodeURIComponent(pathname + search); // The /login page shall then use this `from` param as a `callbackUrl` upon successful sign in
          return NextResponse.redirect(
            new URL(`/welcome?from=${from}`, nextUrl)
          );
        }
      }

      // Don't redirect if on an unprotected page, or if logged in and is on a protected page
      return true;
    },
  },
  pages: {
    signIn: "/welcome",
  },
} satisfies NextAuthConfig;

// We are splitting the auth configuration into multiple files (`auth.config.ts` and `auth.ts`),
// as some adapters (Prisma) and Node APIs (`stream` module required for sending emails) are
// not supported in the Edge runtime. More info here: https://authjs.dev/guides/upgrade-to-v5
export const {
  auth,
  handlers: { GET, POST },
  signIn,
} = NextAuth({
  ...authOptions,
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  callbacks: {
    ...authOptions.callbacks,
    session({ session, ...rest }) {
      // TODO
      const data = rest as any;
      return {
        /**
         * We need to explicitly return the `id` here to make it available to the client
         * when calling `useSession()` as NextAuth does not include the user's id.
         *
         * If you only need to get the `id` of the user in the client, use NextAuth's
         * `useSession()`, but if you need more of user's data, use the `useSessionUserData()`
         * custom hook instead.
         */
        user: {
          id: data.token.sub!,
        },
        expires: session.expires,
      };
    },
  },
});
