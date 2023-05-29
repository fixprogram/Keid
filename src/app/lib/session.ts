import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "./auth";

export async function getUser() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/welcome");
  }

  return user;
}
