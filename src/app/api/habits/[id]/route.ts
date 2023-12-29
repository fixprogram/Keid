import { getUser } from "@/app/lib/session";
import { prisma } from "@/db.server";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const user = await getUser();

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);

  const habit = await prisma.habit.findUnique({ where: { id } });
  //   const habit = await getHabitById(projectId);

  if (!habit) {
    throw new Error(`project with id: ${id} wasn't found`);
  }

  //   const tasks = await (
  //     await getTasksByIds(habit.taskIds)
  //   ).map((task) => ({ ...task, isFavorite: habit.isStarred }));

  const data = {
    ...habit,
    // tasks,
    userProjectNames,
  };

  return NextResponse.json(data);
}
