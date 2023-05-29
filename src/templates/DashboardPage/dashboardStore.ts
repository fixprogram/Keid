import { sortProjects } from "@/shared/lib/utils/sortProjects";
import { sortProjectsByActivity } from "@/shared/lib/utils/sortProjectsByActivity";
import { Project } from "@prisma/client";
import { create } from "zustand";

export type ProjectType = {
  id: string;
  title: string;
  style: string;
  taskAmount: number;
  completedTaskAmount: number;
  projectProgress: number;
};

export type FilterType = "Overview" | "Productivity";
export const FILTERS: FilterType[] = ["Overview", "Productivity"];

type DataType = {
  activityFeed: [];
  overdueTaskAmount: number;
  projectAmount: number;
  totalTaskAmount: number;
  projects: [];
  userName: string;
  weekTasks: [];
  habits: [];
};

export interface ProjectsState {
  data: DataType;
  activeFilter: FilterType;
  setData: (newData: DataType) => void;
  isWeekTasksShowed: boolean;
  setActiveFilter: (newFilter: FilterType) => void;
  toggleWeekTasksShowed: () => void;
}

export const useDashboardStore = create<ProjectsState>((set, get) => ({
  data: {
    activityFeed: [],
    overdueTaskAmount: 0,
    projectAmount: 0,
    totalTaskAmount: 0,
    projects: [],
    userName: "",
    weekTasks: [],
    habits: [],
  },
  isWeekTasksShowed: false,
  activeFilter: FILTERS[0],
  toggleWeekTasksShowed: () =>
    set((state) => ({ isWeekTasksShowed: !state.isWeekTasksShowed })),
  setData: (newData: DataType) =>
    set(() => {
      return {
        data: newData,
      };
    }),

  setActiveFilter: (newActiveFilter: FilterType) =>
    set(() => ({
      activeFilter: newActiveFilter,
    })),
}));
