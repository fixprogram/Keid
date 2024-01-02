import { prisma } from "@/db.server";

export const setNewProjectName = async (
  projectId: string,
  newProjectName: string
) => {
  const project = await prisma.project.update({
    where: { id: projectId },
    data: { title: newProjectName },
  });

  return project;
};
