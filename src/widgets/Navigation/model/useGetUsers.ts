import { useQuery } from "@tanstack/react-query";

async function getData() {
  const res = await fetch(`/api/search`);
  const data = await res.json();

  return data;
}

export const useGetUsers = () => {
  const { data } = useQuery({
    queryKey: ["search"],
    queryFn: getData,
  });

  return data?.users;
};
