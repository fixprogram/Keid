import { TaskType } from "@/shared/config/types";

export const mapTasks = (initialTasks: TaskType[]) => {
  const tasks = {
    All: initialTasks,
    Completed: initialTasks.filter((task) => Boolean(task.completed)),
    "To do": initialTasks.filter((task) => task.completed === 0),
  };

  return tasks;
};