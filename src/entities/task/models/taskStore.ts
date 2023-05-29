import { Task } from "@prisma/client";
import { create } from "zustand";

export interface TaskState {
  data: Task;
  setTaskData: (data: Task) => void;
}

export const useTaskStore = create<TaskState>((set) => ({
  data: {
    id: "",
    title: "",
    projectId: "",
    style: "",
    deadline: 0,
    progress: 0,
    completed: 0,
    subtaskIds: [],
    comments: [],
    repeats: "Once",
    description: "",
  },
  setTaskData: (data: Task) => set(() => ({ data })),
}));
