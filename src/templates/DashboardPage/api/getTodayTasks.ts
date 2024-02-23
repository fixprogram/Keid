import { prisma } from "@/app/lib/prisma/db.server";
import { EnhancedTask } from "@/server/actions";
import { getTodayTimestamps } from "@/shared/lib/utils/getTodayTimestamps";
import { isDateToday } from "@/shared/lib/utils/isDateToday";

export async function getTodayTasks(userId: string): Promise<EnhancedTask[]> {
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { id: true, taskIds: true, isStarred: true },
  });

  const projectIDs = projects.map((projectId) => projectId.id);
  projectIDs.push(userId);

  const { startTimestamp, endTimestamp } = getTodayTimestamps();

  const tasks = await prisma.task.findMany({
    where: {
      OR: [
        {
          projectId: { in: projectIDs },
          deadline: {
            lte: endTimestamp,
            gte: startTimestamp,
          },
        },
        {
          projectId: { in: projectIDs },
          repeats: "Everyday",
        },
      ],
    },
  });

  return tasks.map((task) => {
    const isCompleted =
      task.repeats === "Everyday"
        ? Boolean(
            task.comments.find((comment) =>
              isDateToday(new Date(Number(comment.time)))
            )
          )
        : Boolean(task.completed);

    return { ...task, isCompleted };
  });
}
