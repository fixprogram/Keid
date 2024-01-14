import { Project, Task } from "@prisma/client";

export const mapAndSortTasks = (
  tasks: Task[],
  projects: Pick<Project, "taskIds" | "isStarred" | "title">[]
) => {
  return tasks
    .map((task) => {
      const isFavorite = Boolean(
        projects.find((project) =>
          project.taskIds.some((taskId) => taskId === task.id)
        )?.isStarred
      );

      const projectTitle =
        projects.find((project) =>
          project.taskIds.some((taskId) => taskId === task.id)
        )?.title ?? "";

      return { ...task, isFavorite, projectTitle };
    })
    .sort((a: Task, b: Task) => a.completed - b.completed);
};
