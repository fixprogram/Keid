import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";

import { authOptions } from "./auth";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

const USER_SESSION_KEY = "userId";

export async function createUserSession({
  request,
  userId,
  remember,
  redirectTo,
}: {
  request: Request;
  userId: string;
  remember: boolean;
  redirectTo: string;
}) {
  const session = await getSession(request);
  session.set(USER_SESSION_KEY, userId);
  return redirect(redirectTo);
}

export async function getUser() {
  const session = await getServerSession(authOptions);

  const user = session?.user;

  if (!user) {
    redirect(authOptions?.pages?.signIn || "/welcome");
  }

  return user;
}
