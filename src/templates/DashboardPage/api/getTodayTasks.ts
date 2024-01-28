import { prisma } from "@/app/lib/prisma/db.server";
import { getTodayTimestamps } from "@/shared/lib/utils/getTodayTimestamps";

export async function getTodayTasks(userId: string) {
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { id: true, taskIds: true, isStarred: true },
  });

  const projectIDs = projects.map((projectId) => projectId.id);
  projectIDs.push(userId);

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

  return [];
}
