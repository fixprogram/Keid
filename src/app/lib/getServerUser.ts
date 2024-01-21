import { auth } from "./auth";

export async function getServerUser() {
  const session = await auth();

  return session?.user;
}
