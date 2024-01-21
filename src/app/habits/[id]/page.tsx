import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/app/lib/prisma/db.server";
import Habit from "./habit";
import getUserProjectNames from "@/app/lib/data/user/getUserProjectNames";
import { Comment, CommentType } from "@prisma/client";
import { getHabitData } from "@/server/actions";

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["habit", params.id], () =>
    getHabitData(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Habit id={params.id} />
    </Hydrate>
  );
}
