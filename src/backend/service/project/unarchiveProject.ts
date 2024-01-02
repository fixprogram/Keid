import { prisma } from "@/db.server";

export const unarchiveProject = async (projectId: string) => {
  const project = await prisma.project.update({
    where: { id: projectId },
    data: { isArchived: false },
  });

  return project;
};
