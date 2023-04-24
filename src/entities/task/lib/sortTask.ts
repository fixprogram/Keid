import { Task } from "@prisma/client";
import { TaskType } from "../types";

export function sortTask(a: Task, b: Task) {
  if (a.progress > b.progress) {
    return -1;
  }
  if (a.progress < b.progress) {
    return 1;
  }
  return 0;
}
