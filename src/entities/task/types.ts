import { Task } from "@prisma/client";

export type TaskType = Omit<Task, "completed"> & {
  // deadline: string;
  completed: string;
};
