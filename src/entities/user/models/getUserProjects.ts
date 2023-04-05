import { prisma } from "@/db.server";
import { getCompletedTaskAmount } from "@/entities/task/models/getCompletedTaskAmount";

export async function getUserProjects(userId: string) {
  const userProjects = await prisma.project.findMany({
    where: { userId },
  });

  const projects = userProjects.map(async (project, index, array) => {
    const completedTaskAmount = await getCompletedTaskAmount(project.taskIds);

    return { ...project, completedTaskAmount };
  });

  return await Promise.all(projects).then((res) => res);
}
