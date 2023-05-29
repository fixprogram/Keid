export const sortProjects = <
  T extends { isStarred: boolean; taskIds: []; id: string }
>(
  projects: T[]
) => {
  const mappedProjects = projects
    .sort(
      (projectA, projectB) => projectB.taskIds.length - projectA.taskIds.length
    )
    .map((project) => {
      if (project.isStarred && project.taskIds.length) {
        return { ...project, priority: 1 };
      }

      if (project.taskIds.length) {
        return { ...project, priority: 2 };
      }

      if (project.isStarred) {
        return { ...project, priority: 3 };
      }

      return { ...project, priority: 4 };
    });

  const sorted = mappedProjects.sort((projectA, projectB) => {
    const mappedProjectA = mappedProjects.find(
      (project) => project.id === projectA.id
    ) as T & {
      priority: number;
    };
    const mappedProjectB = mappedProjects.find(
      (project) => project.id === projectB.id
    ) as T & {
      priority: number;
    };

    return mappedProjectA.priority - mappedProjectB.priority;
  });

  return sorted.map((project) => {
    const { priority, ...rest } = project;

    return { ...rest };
  });
};
