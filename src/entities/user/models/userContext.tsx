import { useQuery } from "@tanstack/react-query";
import React, {
  FC,
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import Loading from "@/app/loading";

async function getData() {
  const res = await fetch(`/api/navigation`);
  return await res.json();
}

type User = {
  userId: string;
  name: string;
} | null;

export const UserContext = createContext<User>(null);

interface UserProviderPropsType {
  children: ReactNode;
}
export const UserProvider: FC<UserProviderPropsType> = ({ children }) => {
  const [user, setUser] = useState<User>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["navigation"],
    queryFn: getData,
  });

  useEffect(() => {
    console.log("data: ", data);
    if (data && !isLoading) {
      setUser({ userId: data.userId, name: data.userName });
    }
  }, [data, isLoading]);

  if (isLoading) {
    return <Loading />;
  }

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const useUser = () => useContext(UserContext);
