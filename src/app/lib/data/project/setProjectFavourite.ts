import { prisma } from "@/db.server";

export const setProjectFavourite = async (
  projectId: string,
  isStarred: boolean
) => {
  const project = await prisma.project.update({
    where: { id: projectId },
    data: { isStarred },
  });

  return project;
};