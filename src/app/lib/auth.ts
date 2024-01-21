// import NextAuth from "next-auth";
// import type { DefaultSession } from "next-auth";
import { prisma } from "@/app/lib/prisma/db.server";
// import { PrismaAdapter } from "@auth/prisma-adapter";
// import authConfig from "./auth.config";

// declare module "next-auth" {
//   interface Session {
//     user: DefaultSession["user"] & { id: string; name: string };
//   }
// }

// // We are splitting the auth configuration into multiple files (`auth.config.ts` and `auth.ts`),
// // as some adapters (Prisma) and Node APIs (`stream` module required for sending emails) are
// // not supported in the Edge runtime. More info here: https://authjs.dev/guides/upgrade-to-v5
// export const {
//   auth,
//   handlers: { GET, POST },
//   signIn,
// } = NextAuth({
//   pages: {
//     signIn: "/welcome",
//   },
//   adapter: PrismaAdapter(prisma),
//   session: { strategy: "jwt" },
//   callbacks: {
//     async signIn({ user }) {
//       const existingUser = await prisma.user.findUnique({
//         where: { id: user.id },
//       });

//       // Prevent sign in without email verification
//       if (!existingUser?.emailVerified) return false;

//       return true;
//     },
//     async session({ token, session }) {
//       // if (token.sub && session.user) {
//       //   session.user.id = token.sub;
//       // }

//       return {
//         /**
//          * We need to explicitly return the `id` here to make it available to the client
//          * when calling `useSession()` as NextAuth does not include the user's id.
//          *
//          * If you only need to get the `id` of the user in the client, use NextAuth's
//          * `useSession()`, but if you need more of user's data, use the `useSessionUserData()`
//          * custom hook instead.
//          */
//         user: {
//           id: token.sub!,
//           name: session.user.name,
//         },
//         expires: session.expires,
//       };
//       // return session;
//     },
//     async jwt({ token }) {
//       if (!token.sub) return token;

//       return token;
//     },
//   },

//   // callbacks: {
//   //   ...authOptions.callbacks,
//   //   // ...authOptions.callbacks,
//   //   session({ session, token }) {
//   // return {
//   //   /**
//   //    * We need to explicitly return the `id` here to make it available to the client
//   //    * when calling `useSession()` as NextAuth does not include the user's id.
//   //    *
//   //    * If you only need to get the `id` of the user in the client, use NextAuth's
//   //    * `useSession()`, but if you need more of user's data, use the `useSessionUserData()`
//   //    * custom hook instead.
//   //    */
//   //   user: {
//   //     id: token.sub!,
//   //     name: session.user.name
//   //   },
//   //   expires: session.expires,
//   // };
//   //   },
//   // },
//   ...authConfig,
// });

import NextAuth, { type DefaultSession } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";

import authConfig from "./auth.config";
// import { getAccountByUserId } from "./data/account";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  callbacks: {
    async signIn({ user, account }) {
      // Allow OAuth without email verification
      if (account?.provider !== "credentials") return true;

      const existingUser = await prisma.user.findUnique({
        where: { id: user.id },
      });

      // Prevent sign in without email verification
      if (!existingUser?.emailVerified) return false;

      return true;
    },
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await prisma.user.findUnique({
        where: { id: token.sub },
      });

      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;

      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  ...authConfig,
});
