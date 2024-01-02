import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { getUser } from "../lib/session";
import { getWeeklyActivityData } from "@/features/Activity/api";
import Profile from "./profile";

async function getData() {
  const user = await getUser();

  const userId = user.id;

  const activityData = await getWeeklyActivityData(userId);

  return {
    activityData,
    userName: user.name,
    userEmail: user.email,
  };
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["profile"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Profile />
    </Hydrate>
  );
}
