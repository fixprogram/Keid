import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/app/lib/prisma/db.server";
import { Challenge } from "./challenge";
import { CommentType } from "@prisma/client";
import { getChallengeData } from "@/server/actions";

export default async function Page({ params }: { params: { id: string } }) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["challenge", params.id], () =>
    getChallengeData(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Challenge id={params.id} />
    </Hydrate>
  );
}
