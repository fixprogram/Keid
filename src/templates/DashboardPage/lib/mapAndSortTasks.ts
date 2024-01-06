import { Project, Task } from "@prisma/client";

export const mapAndSortTasks = (
  tasks: Task[],
  projects: Pick<Project, "taskIds" | "isStarred">[]
) => {
  return tasks
    .map((task) => {
      const isFavorite = Boolean(
        projects.find((project) =>
          project.taskIds.some((taskId) => taskId === task.id)
        )?.isStarred
      );

      return { ...task, isFavorite };
    })
    .sort((a: Task, b: Task) => a.completed - b.completed);
};
