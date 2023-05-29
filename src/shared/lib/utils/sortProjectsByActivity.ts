import { Project } from "@prisma/client";

export const sortProjectsByActivity = <
  T extends { taskAmount: number; completedTaskAmount: number; id: string }
>(
  projects: T[]
) => {
  const mappedProjects = projects.map((project) => ({
    ...project,
    totalTask: project.taskAmount + project.completedTaskAmount,
  }));

  return projects.sort((projectA, projectB) => {
    const mappedProjectA = mappedProjects.find(
      (project) => project.id === projectA.id
    ) as T & {
      totalTask: number;
    };
    const mappedProjectB = mappedProjects.find(
      (project) => project.id === projectB.id
    ) as T & {
      totalTask: number;
    };

    return mappedProjectA.totalTask - mappedProjectB.totalTask;
  });
};
