import { TaskType } from "@/shared/config/types";
import { sortProjects } from "@/shared/lib/utils/sortProjects";
import { sortProjectsByActivity } from "@/shared/lib/utils/sortProjectsByActivity";
import { Habit, Project, Task } from "@prisma/client";
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

export enum DateType {
  "Today" = "Today",
  "This week" = "This week",
  "This month" = "This month",
}

export const DATES: DateType[] = [
  DateType.Today,
  DateType["This week"],
  DateType["This month"],
];

// export type TaskType = Task & { isFavorite: boolean };

type DataType = {
  activityFeed: [];
  overdueTaskAmount: number;
  projectAmount: number;
  totalTaskAmount: number;
  projects: [];
  userName: string;
  tasks: TaskType[];
  habits: Habit[];
};

export interface ProjectsState {
  data: DataType;
  activeFilter: FilterType;
  dateType: DateType;
  setData: (newData: DataType) => void;
  isWeekTasksShowed: boolean;
  setActiveFilter: (newFilter: FilterType) => void;
  toggleWeekTasksShowed: () => void;
  setDateType: (newDateType: DateType) => void;
}

export const useDashboardStore = create<ProjectsState>((set, get) => ({
  data: {
    activityFeed: [],
    overdueTaskAmount: 0,
    projectAmount: 0,
    totalTaskAmount: 0,
    projects: [],
    userName: "",
    tasks: [],
    habits: [],
  },
  dateType: DATES[0],
  isWeekTasksShowed: false,
  activeFilter: FILTERS[0],
  toggleWeekTasksShowed: () =>
    set((state) => ({ isWeekTasksShowed: !state.isWeekTasksShowed })),
  setData: (newData) =>
    set(() => {
      newData.tasks = newData.tasks.map((task) => ({
        ...task,
        isFavorite: false,
      }));
      return {
        data: newData,
      };
    }),

  setActiveFilter: (newActiveFilter) =>
    set(() => ({
      activeFilter: newActiveFilter,
    })),

  setDateType(newDateType) {
    set(() => ({ dateType: newDateType }));
  },
}));
