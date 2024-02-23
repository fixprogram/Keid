import { EnhancedTask } from "@/server/actions";
import { CommentType, Project, Task } from "@prisma/client";

export const mapAndSortTasks = (
  tasks: EnhancedTask[],
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

      const completed = task.isCompleted
        ? Number(
            task.comments
              .reverse()
              .find((comment) => comment.type === CommentType.COMPLETED)
              ?.time ?? 0
          )
        : task.completed;

      return { ...task, isFavorite, projectTitle, completed };
    })
    .sort((a: Task, b: Task) => a.completed - b.completed);
};
