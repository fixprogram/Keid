import { prisma } from "@/db.server";
import { getTodayTimestamps } from "@/shared/lib/utils/getTodayTimestamps";

export async function getTodayTasks(projectIDs: string[]) {
  const { startTimestamp, endTimestamp } = getTodayTimestamps();

  const tasks = await prisma.task.findMany({
    where: {
      projectId: { in: projectIDs },
      deadline: {
        lte: endTimestamp,
        gte: startTimestamp,
      },
    },
  });

  return tasks;
}
