import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { getServerUser } from "../lib/getServerUser";
import { getUserProjects } from "@/app/lib/data/user/getUserProjects";
import { Notifications } from "./notifications";
import { prisma } from "@/app/lib/prisma/db.server";
import { getNotificationsData } from "@/server/actions";

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["notifications"], getNotificationsData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Notifications />
    </Hydrate>
  );
}
