import { prisma } from "@/db.server";
import { getFirstDayOfTheWeek, getLastDayOfTheWeek } from "./lib";

export async function getWeekTasks(projectIDs: string[]) {
  const firstDayTimestamp = getFirstDayOfTheWeek();
  const lastDayTimestamp = getLastDayOfTheWeek();

  console.log({ firstDayTimestamp, lastDayTimestamp });

  const tasks = await prisma.task.findMany({
    where: {
      projectId: { in: projectIDs },
      deadline: {
        lte: lastDayTimestamp,
        gte: firstDayTimestamp,
      },
    },
  });

  return tasks;
}
