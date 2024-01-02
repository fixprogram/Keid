import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import { getUser } from "../lib/session";
import { Challenges } from "./challenges";

async function getData() {
  const user = await getUser();

  const userId = user.id;

  const challenges = await prisma.challenge.findMany({ where: { userId } });

  return {
    challenges,
  };
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["challenges"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Challenges />
    </Hydrate>
  );
}
