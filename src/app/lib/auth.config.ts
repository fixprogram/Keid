import Credentials from "@auth/core/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { findUserByEmail } from "./data/user/findUserByEmail";
import bcryptjs from "bcryptjs";

export default {
  secret: process.env.NextAuth_SECRET,
  providers: [
    //   CredentialsProvider({
    //     credentials: {
    //       email: {},
    //       password: {},
    //     },
    //     async authorize(credentials) {
    //   const email = credentials?.email as string;
    //   const password = credentials?.password as string;
    //       const res = await fetch(links.login, {
    //         method: "POST",
    //         headers: {
    //           "Content-Type": "application/json",
    //         },
    //         body: JSON.stringify({
    //           email,
    //           password,
    //         }),
    //       });

    //       const user = (await findUserByEmail(email)) as User;

    //       const isPasswordCorrect = bcryptjs.compareSync(
    //         password,
    //         user?.passwordHash
    //       );

    //       if (res.ok && isPasswordCorrect) {
    //         console.log("Return ok");
    //         return user;
    //       } else return null;
    //     },
    //   }),
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (email && password) {
          // const { email, password } = validatedFields.data;
          const user = await findUserByEmail(email);

          if (!user) return null;

          const passwordsMatch = await bcryptjs.compareSync(
            password,
            user.passwordHash
          );

          if (passwordsMatch) return user;
        }

        return null;
      },
    }),
  ],
  // callbacks: {
  //   // async jwt({ token, user }) {
  //   //   return { ...token, ...user };
  //   // },
  //   // async session({ session, token }) {
  //   //   session.user = token;
  //   //   return session;
  //   // },
  //   authorized({ auth, request: { nextUrl } }) {
  //     const { pathname, search } = nextUrl;
  //     const isLoggedIn = !!auth?.user;
  //     const isOnAuthPage =
  //       pathname.startsWith("/welcome") || pathname.startsWith("/auth");

  //     // const unProtectedPages = ['/terms', '/privacy-policy']; // Add more here if needed
  //     // const isOnUnprotectedPage =
  //     //   pathname === '/' || // The root page '/' is also an unprotected page
  //     //   unProtectedPages.some((page) => pathname.startsWith(page));
  //     // const isProtectedPage = !isOnUnprotectedPage;

  //     if (isOnAuthPage) {
  //       // Redirect to /dashboard/overview, if logged in and is on an auth page
  //       if (isLoggedIn)
  //         return NextResponse.redirect(new URL("/dashboard/overview", nextUrl));
  //     } else {
  //       // Redirect to /welcome, if not logged in but is on a protected page
  //       if (!isLoggedIn) {
  //         const from = encodeURIComponent(pathname + search); // The /login page shall then use this `from` param as a `callbackUrl` upon successful sign in
  //         return NextResponse.redirect(
  //           new URL(`/welcome?from=${from}`, nextUrl)
  //         );
  //       }
  //     }

  //     // Don't redirect if on an unprotected page, or if logged in and is on a protected page
  //     return true;
  //   },
  // },
  // pages: {
  //   signIn: "/welcome",
  // },
} satisfies NextAuthConfig;
