import { prisma } from "@/db.server";

export async function getTodayTasks(projectIDs: string[]) {
  let now = new Date();

  // Start of the day
  let startOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let startTimestamp = startOfDay.getTime();

  // End of the day
  let endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59,
    999
  );
  let endTimestamp = endOfDay.getTime();

  const allTasks = await prisma.task.findMany({
    where: { projectId: { in: projectIDs } },
    select: { id: true },
  });

  const taskIds = allTasks.map((task) => task.id);

  const tasks = await prisma.task.findMany({
    where: {
      id: { in: taskIds },
      deadline: {
        lte: endTimestamp,
        gte: startTimestamp,
      },
    },
  });

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
  }));

  return [...tasks, ...mappedSubtasks];
}
