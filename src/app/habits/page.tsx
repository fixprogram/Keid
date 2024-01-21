import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/app/lib/prisma/db.server";
import { getServerUser } from "../lib/getServerUser";
import Habits from "./habits";

async function getData() {
  const user = await getServerUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const userId = user.id;

  const projects = await prisma.project.findMany({
    where: { userId },
    select: { title: true, style: true, taskIds: true, isStarred: true },
  });
  const userProjectNames = projects.map((project) => ({
    title: project.title,
    style: project.style,
  }));

  const habits = await prisma.habit.findMany({ where: { userId } });

  return {
    userProjectNames,
    habits,
  };
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["habits"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Habits />
    </Hydrate>
  );
}
