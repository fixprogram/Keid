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

      const lastCompleted = task.comments
        .reverse()
        .find((comment) => comment.type === CommentType.COMPLETED)?.time;
      const completedDate = task.isCompleted
        ? lastCompleted
          ? new Date(lastCompleted)
          : null
        : task.completed;

      return { ...task, isFavorite, projectTitle, completed: completedDate };
    })
    .sort((a: Task, b: Task) => {
      if (a.completed !== null && b.completed !== null) {
        return (
          new Date(a.completed).getTime() - new Date(b.completed).getTime()
        );
      }

      return 0;
    });
};
