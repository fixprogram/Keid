import { Task } from "@prisma/client";

export type TaskType = Omit<Task, "deadline" | "completed"> & {
  deadline: string;
  completed: string;
} & {
  state: "Idea" | "Task" | "Completed";
};
