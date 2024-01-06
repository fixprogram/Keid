import { prisma } from "@/db.server";

export async function getThisMonthTasks(projectIDs: string[]) {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  startOfMonth.setHours(0, 0, 0, 0); // Set to start of the day
  const startTimestamp = startOfMonth.getTime();

  // End of the current month
  const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  endOfMonth.setHours(0, 0, 0, 0); // Set to start of the next month
  endOfMonth.setTime(endOfMonth.getTime() - 1); // Subtract 1 millisecond to get end of current month
  const endTimestamp = endOfMonth.getTime();

  // const allTasks = await prisma.task.findMany({
  //   where: { projectId: { in: projectIDs } },
  //   select: { id: true },
  // });

  // const taskIds = allTasks.map((task) => task.id);

  const tasks = await prisma.task.findMany({
    where: {
      projectId: { in: projectIDs },
      deadline: {
        lte: endTimestamp,
        gte: startTimestamp,
      },
    },
  });

  // const subtaskIds: string[] = [];
  // tasks.forEach((task) => subtaskIds.push(...task.subtaskIds));

  // const subtasks = await prisma.subtask.findMany({
  //   where: {
  //     taskId: { in: taskIds },
  //     deadline: {
  //       lte: endTimestamp,
  //       gte: startTimestamp,
  //     },
  //   },
  // });

  // const mappedSubtasks = subtasks.map((subtask) => ({
  //   ...subtask,
  //   repeats: "Once",
  //   subtaskIds: [],
  //   style: "01",
  //   type: "subtask",
  //   projectId: tasks.find((task) => subtask.id in task.subtaskIds)
  //     ?.projectId as string,
  //   parentId: subtask.taskId,
  // }));

  return tasks;
  // return [...tasks, ...mappedSubtasks];
}
