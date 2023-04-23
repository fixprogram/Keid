import { getDateString } from "@/shared/lib/utils/getDateString";
import { Task } from "@prisma/client";

export const convertTaskDatesIntoString = (tasks: Task[]) => {
  return tasks.map((task) => {
    return {
      ...task,
      // deadline: getDateString(new Date(task.deadline), false),
      completed:
        task.completed === 0
          ? ""
          : getDateString(new Date(task.completed), false),
    };
  });
};
