import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { User } from "../types";
import { prisma } from "@/db.server";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { redirect } from "next/navigation";
import { authOptions } from "../lib/auth";
import { getUser } from "../lib/session";
import { getWeekTasks } from "@/features/WeekTasks/api";
import { getUserProjects } from "@/entities/user/models/getUserProjects";
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

export default async function Hydation() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["profile"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Profile />
    </Hydrate>
  );
}
