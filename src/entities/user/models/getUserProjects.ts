import { prisma } from "@/db.server";
import { getProjectProgress } from "@/entities/project/models/getProjectProgress";
import { getProjectTaskAmount } from "@/entities/project/models/getProjectTaskAmount";
import { getCompletedTaskAmount } from "@/entities/task/models/getCompletedTaskAmount";

export async function getUserProjects(userId: string) {
  const userProjects = await prisma.project.findMany({
    where: { userId },
  });

  const projects = userProjects.map(async (project, index, array) => {
    const taskAmount = await getProjectTaskAmount(project.taskIds);
    const completedTaskAmount = await getCompletedTaskAmount(project.taskIds);
    const projectProgress = await getProjectProgress(project.taskIds);

    return { ...project, taskAmount, completedTaskAmount, projectProgress };
  });

  return await Promise.all(projects).then((res) => res);
}
