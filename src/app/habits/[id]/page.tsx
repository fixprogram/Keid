import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/db.server";
import { getUser } from "@/app/lib/session";
import Habit from "./habit";
import getUserProjectNames from "@/app/lib/data/user/getUserProjectNames";
import { CommentType } from "@prisma/client";

export async function getData(habitId: string) {
  const user = await getUser();

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);

  const habit = await prisma.habit.findUnique({ where: { id: habitId } });

  if (!habit) {
    throw new Error(`project with id: ${habitId} wasn't found`);
  }

  const completedDays: string[] = habit.comments
    .filter((comment) => comment.type === CommentType.PROGRESS_UPDATE)
    .map((comment) => {
      const date = new Date(Number(comment.time));
      const dateStr = date.toISOString().split("T")[0];
      return dateStr;
    });

  habit.comments = habit.comments
    .filter((comment) => comment.type === CommentType.USER_COMMENT)
    .map((comment) => ({
      ...comment,
      userName: user.name,
    }));

  return {
    ...habit,
    userProjectNames,
    completedDays,
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
