import { prisma } from "@/db.server";
import { getProjectProgress } from "@/backend/service/project/getProjectProgress";
import { getProjectTaskAmount } from "@/backend/service/project/getProjectTaskAmount";
import { getCompletedTaskAmount } from "@/backend/service/task/getCompletedTaskAmount";

export async function getUserProjects(userId: string) {
  const userProjects = await prisma.project.findMany({
    where: { userId },
  });

  const projects = userProjects.map(async (project, index, array) => {
    const taskAmount = await getProjectTaskAmount(project.id);
    const completedTaskAmount = await getCompletedTaskAmount(project.id);
    const projectProgress = await getProjectProgress(project.id);

    return { ...project, taskAmount, completedTaskAmount, projectProgress };
  });

  return await Promise.all(projects).then((res) => res);
}
