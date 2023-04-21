import { TaskType } from "../types";

export function sortTask(a: TaskType, b: TaskType) {
  if (a.progress > b.progress) {
    return -1;
  }
  if (a.progress < b.progress) {
    return 1;
  }
  return 0;
}
