import { EnhancedTask } from "@/server/actions";
import { CommentType, Project, Task } from "@prisma/client";

export const mapAndSortTasks = (
  tasks: EnhancedTask[],
  projects: Pick<Project, "taskIds" | "isStarred" | "title">[]
) => {
  const mappedTasks = tasks.map((task) => {
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
        ? new Date(Number(lastCompleted))
        : null
      : task.completed;

    return { ...task, isFavorite, projectTitle, completed: completedDate };
  });

  const uncompletedTasks = mappedTasks.filter(
    (task) => task.completed === null
  );
  const completedTasks = mappedTasks
    .filter((task) => task.completed)
    .sort((a, b) => {
      return (a.completed as Date).getTime() - (b.completed as Date).getTime();
    });

  return [...uncompletedTasks, ...completedTasks];
};
