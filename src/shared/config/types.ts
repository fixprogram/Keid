// Elements which can be deleted, completed and progress updated

import { Task } from "@prisma/client";

export type ItemType = "task" | "subtask" | "habit" | "challenge";

export type TaskType = Task & {
  isFavorite: boolean;
  projectTitle: string;
};
