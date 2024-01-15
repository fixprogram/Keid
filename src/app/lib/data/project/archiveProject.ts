import { prisma } from "@/app/lib/prisma/db.server";

export const archiveProject = async (projectId: string) => {
  const project = await prisma.project.update({
    where: { id: projectId },
    data: { isArchived: true },
  });

  return project;
};
