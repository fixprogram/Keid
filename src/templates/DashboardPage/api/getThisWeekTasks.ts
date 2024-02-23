import { prisma } from "@/app/lib/prisma/db.server";
import { getFirstDayOfTheWeek } from "@/shared/lib/utils/getFirstDayOfTheWeek";
import { getLastDayOfTheWeek } from "@/shared/lib/utils/getLastDayOfTheWeek";

export async function getThisWeekTasks(projectIDs: string[]) {
  const firstDayTimestamp = getFirstDayOfTheWeek();
  const lastDayTimestamp = getLastDayOfTheWeek();

  const tasks = await prisma.task.findMany({
    where: {
      projectId: { in: projectIDs },
      deadline: {
        lte: new Date(lastDayTimestamp),
        gte: new Date(firstDayTimestamp),
      },
      repeats: "Once",
    },
  });

  return tasks.map((task) => ({
    ...task,
    isCompleted: Boolean(task.completed),
  }));
  // return [...tasks, ...mappedSubtasks];
}
