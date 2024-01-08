import React, { FC, ReactNode, createContext, useContext } from "react";
import Loading from "@/app/loading";
import { useSession } from "next-auth/react";

async function getData() {
  const res = await fetch(`/api/navigation`);
  return await res.json();
}

type User = {
  userId: string;
  name: string | null | undefined;
} | null;

export const UserContext = createContext<User>(null);

interface UserProviderPropsType {
  children: ReactNode;
}
export const UserProvider: FC<UserProviderPropsType> = ({ children }) => {
  const { data, status } = useSession();

  if (status === "loading") {
    return <Loading />;
  }

  const user = data
    ? {
        userId: data.user.id,
        name: data.user.name,
      }
    : null;

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
