import { Task } from "@prisma/client";

export type TaskType = Task & {
  state: "Idea" | "Task" | "Completed";
};
