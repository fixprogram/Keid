import { auth } from "./auth";

export async function getServerUser() {
  const session = await auth();

  return { id: session?.user.id as string, name: session?.user.name };
}