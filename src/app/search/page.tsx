import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { getServerUser } from "@/app/lib/getServerUser";
import { prisma } from "@/app/lib/prisma/db.server";
import { Search } from "./search";

export async function getData() {
  const user = await getServerUser();

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
