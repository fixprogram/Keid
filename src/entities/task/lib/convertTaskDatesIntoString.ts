import { getDateString } from "@/shared/lib/utils/getDateString";
import { Task } from "@prisma/client";

export const convertTaskDatesIntoString = (tasks: Task[]) => {
  return tasks.map((task) => {
    return {
      ...task,
      completed:
        task.completed === null ? "" : getDateString(task.completed, false),
    };
  });
};
