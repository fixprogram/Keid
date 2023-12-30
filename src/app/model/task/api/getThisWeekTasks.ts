import { prisma } from "@/db.server";
import {
  getFirstDayOfTheWeek,
  getLastDayOfTheWeek,
} from "@/features/WeekTasks/lib";

export async function getWeekTasks(projectIDs: string[]) {
  const firstDayTimestamp = getFirstDayOfTheWeek();
  const lastDayTimestamp = getLastDayOfTheWeek();

  const allTasks = await prisma.task.findMany({
    where: { projectId: { in: projectIDs } },
    select: { id: true },
  });

  const taskIds = allTasks.map((task) => task.id);

  const tasks = await prisma.task.findMany({
    where: {
      id: { in: taskIds },
      deadline: {
        lte: lastDayTimestamp,
        gte: firstDayTimestamp,
      },
    },
  });

  const subtaskIds: string[] = [];
  tasks.forEach((task) => subtaskIds.push(...task.subtaskIds));

  const subtasks = await prisma.subtask.findMany({
    where: {
      taskId: { in: taskIds },
      deadline: {
        lte: lastDayTimestamp,
        gte: firstDayTimestamp,
      },
    },
  });

  const mappedSubtasks = subtasks.map((subtask) => ({
    ...subtask,
    repeats: "Once",
    subtaskIds: [],
    style: "01",
    type: "subtask",
  }));

  return [...tasks, ...mappedSubtasks];
}
