// Elements which can be deleted, completed and progress updated

import { Task } from "@prisma/client";

export type ItemType = "task" | "subtask" | "habit";

export type TaskType = Task & {
  isFavourite: boolean;
  projectTitle: string;
};
