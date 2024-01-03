import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";
import { prisma } from "@/db.server";
import { Profile } from "./profile";

async function getData(id: string) {
  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    throw new Error(`User with id ${id} wasn't found`);
  }

  const activityData = await getWeeklyActivityData(user.id);

  return {
    activityData,
    userName: user.name,
    userEmail: user.email,
  };
}

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["profile", params.id], () =>
    getData(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Profile id={params.id} />
    </Hydrate>
  );
}
