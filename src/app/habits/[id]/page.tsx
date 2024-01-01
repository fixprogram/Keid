import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import { getSubtasksByIds } from "@/entities/subtask/models/getSubtasksByIds";
import { CommentType } from "@/features/Comments/config/types";
import Task from "./habit";
import { getUser } from "@/app/lib/session";
import Habit from "./habit";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";

async function getData(habitId: string) {
  const user = await getUser();

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);

  const habit = await prisma.habit.findUnique({ where: { id: habitId } });
  //   const habit = await getHabitById(projectId);

  if (!habit) {
    throw new Error(`project with id: ${habitId} wasn't found`);
  }

  //   const tasks = await (
  //     await getTasksByIds(habit.taskIds)
  //   ).map((task) => ({ ...task, isFavorite: habit.isStarred }));

  return {
    ...habit,
    // tasks,
    userProjectNames,
  };
}

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["habit", params.id], () =>
    getData(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Habit id={params.id} />
    </Hydrate>
  );
}
