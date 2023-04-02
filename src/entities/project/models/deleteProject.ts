import { prisma } from "@/db.server";

export const deleteProject = async (projectId: string) => {
  const project = await prisma.project.delete({
    where: { id: projectId },
  });

  return project;
};
