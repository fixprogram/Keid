import { Task } from "@prisma/client";
import { createWithEqualityFn } from "zustand/traditional";

export interface TaskState {
  data: Task;
  setTaskData: (data: Task) => void;
}

export const useTaskStore = createWithEqualityFn<TaskState>((set) => ({
  data: {
    id: "",
    title: "",
    parentId: "",
    projectId: "",
    style: "",
    deadline: 0,
    progress: 0,
    completed: 0,
    subtaskIds: [],
    comments: [],
    repeats: "Once",
    description: "",
    points: 0,
    metrics: [],
  },
  setTaskData: (data: Task) => set(() => ({ data })),
}));
