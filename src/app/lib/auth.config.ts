import Credentials from "@auth/core/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { findUserByEmail } from "./data/user/findUserByEmail";
import bcryptjs from "bcryptjs";

export default {
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      async authorize(credentials) {
        const email = credentials?.email as string;
        const password = credentials?.password as string;

        if (email && password) {
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
} satisfies NextAuthConfig;
