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

  // const subtaskIds: string[] = [];
  // tasks.forEach((task) => subtaskIds.push(...task.subtaskIds));

  // const subtasks = await prisma.subtask.findMany({
  //   where: {
  //     projectId: { in: projectIDs },
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
