import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { getServerUser } from "@/app/lib/getServerUser";
import { prisma } from "@/app/lib/prisma/db.server";
import { Search } from "./search";
import { getSearchData } from "@/server/actions";

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["search"], getSearchData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Search />
    </Hydrate>
  );
}
