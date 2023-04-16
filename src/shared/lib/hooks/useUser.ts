import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

export interface User {
  name: string;
  email: string;
  id: string;
}

export function useUser() {
  const { data, status } = useSession();
  const router = useRouter();

  if (status === "loading") {
    return null;
  }

  if (status === "unauthenticated") {
    router.replace("/welcome");
  }

  const user = data?.user as User;

  return user;
}
