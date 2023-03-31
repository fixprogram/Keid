import { prisma } from "@/db.server";

export const createProject = async (
  userId: string,
  projectName: string,
  projectStyle: string
) => {
  const project = await prisma.project.create({
    data: {
      userId,
      title: projectName,
      style: projectStyle,
      taskIds: [],
    },
  });

  return project;
};
