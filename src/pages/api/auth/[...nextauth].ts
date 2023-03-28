import { User } from "@prisma/client";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { findUserByEmail } from "@/shared/models/user";
import bcryptjs from "bcryptjs";

export const authOptions: NextAuthOptions = {
  secret: process.env.NextAuth_SECRET,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),

    CredentialsProvider({
      async authorize(credentials: { email: string; password: string }, req) {
        const { email, password } = credentials;
        const res = await fetch("http://localhost:3000/api/login", {
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
    async session({ session, token, user }) {
      session.user = token;
      return session;
    },
  },
  pages: {
    signIn: "/welcome",
  },
};

export default NextAuth(authOptions);
