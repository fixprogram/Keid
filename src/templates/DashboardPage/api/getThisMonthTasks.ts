import { prisma } from "@/app/lib/prisma/db.server";

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

  const tasks = await prisma.task.findMany({
    where: {
      projectId: { in: projectIDs },
      deadline: {
        lte: new Date(endTimestamp),
        gte: new Date(startTimestamp),
      },
      repeats: "Once",
    },
  });

  return tasks.map((task) => ({
    ...task,
    isCompleted: Boolean(task.completed),
  }));
}
