import { getServerSession } from "next-auth/next";
import { authOptions } from "./auth";
import { User } from "next-auth";

export async function getSession(request: Request) {
  const cookie = request.headers.get("Cookie");
  return sessionStorage.getSession(cookie);
}

export async function getUser() {
  const session = await getServerSession(authOptions);

  return session?.user as User;
}
