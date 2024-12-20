import { Project } from "@prisma/client";
import { createWithEqualityFn } from "zustand/traditional";
import { ProjectScreenType, PROJECT_SCREENS } from "../config/consts";

type DataType = Project & {
  tasks: [];
  userProjectNames: [];
};

export interface ProjectState {
  data: DataType;
  activeScreen: ProjectScreenType;
  setActiveScreen: (newActiveScreen: ProjectScreenType) => void;
  setData: (newData: DataType) => void;
}

export const useProjectStore = createWithEqualityFn<ProjectState>(
  (set, get) => ({
    data: {
      id: "",
      userId: "",
      title: "",
      style: "",
      taskIds: [],
      isStarred: false,
      tasks: [],
      userProjectNames: [],
      completed: 0,
      isArchived: false,
      metrics: [],
    },
    activeScreen: PROJECT_SCREENS[0],
    setActiveScreen: (newActiveScreen: ProjectScreenType) =>
      set(() => ({ activeScreen: newActiveScreen })),
    setData: (newData: DataType) => set(() => ({ data: newData })),
  })
);
