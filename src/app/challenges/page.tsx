import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import { getUser } from "../lib/session";
import { Challenges } from "./challenges";
import { transformChallenges } from "../dashboard/overview/page";

async function getData() {
  const user = await getUser();

  const userId = user.id;

  // const challenges = await prisma.challenge.findMany({ where: { userId } });

  const challenges = await prisma.challenge.findMany({
    where: {
      OR: [{ userId }, { members: { some: { id: userId } } }],
    },
  });

  const transformedChallenges = await transformChallenges(challenges);

  return {
    challenges: transformedChallenges,
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