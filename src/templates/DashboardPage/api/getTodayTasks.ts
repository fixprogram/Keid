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

  const taskIds = tasks.map((task) => task.id);

  const subtaskIds: string[] = [];
  tasks.forEach((task) => subtaskIds.push(...task.subtaskIds));

  const subtasks = await prisma.subtask.findMany({
    where: {
      taskId: { in: taskIds },
      deadline: {
        lte: endTimestamp,
        gte: startTimestamp,
      },
    },
  });

  const mappedSubtasks = subtasks.map((subtask) => ({
    ...subtask,
    repeats: "Once",
    subtaskIds: [],
    style: "01",
    type: "subtask",
    projectId: tasks.find((task) => subtask.id in task.subtaskIds)
      ?.projectId as string,
  }));

  return [...tasks, ...mappedSubtasks];
}
