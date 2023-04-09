import { User } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import bcryptjs from "bcryptjs";
import { findUserByEmail } from "@/entities/user/models/findUserByEmail";
import { links } from "@/shared/config/links";

export const authOptions: NextAuthOptions = {
  secret: process.env.NextAuth_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),

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
    async jwt({ token, user }) {
      return { ...token, ...user };
    },
    async session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/welcome",
  },
};

export default NextAuth(authOptions);
