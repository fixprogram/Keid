import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import { Challenge } from "./challenge";

async function getData(challengeId: string) {
  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  if (!challenge) {
    throw new Error(`challenge with id: ${challengeId} wasn't found`);
  }

  return {
    ...challenge,
  };
}

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["challenge", params.id], () =>
    getData(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Challenge id={params.id} />
    </Hydrate>
  );
}
