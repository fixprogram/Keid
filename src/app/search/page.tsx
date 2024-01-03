import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { getUser } from "@/app/lib/session";
import { prisma } from "@/db.server";
import { Search } from "./search";

export async function getData() {
  const user = await getUser();

  const users = await prisma.user.findMany({
    where: { NOT: { id: user.id } },
    select: { name: true, id: true },
  });

  return {
    users,
  };
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["search"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Search />
    </Hydrate>
  );
}
