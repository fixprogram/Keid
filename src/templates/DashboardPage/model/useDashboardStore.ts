import { TaskType } from "@/shared/config/types";
import { sortProjects } from "@/shared/lib/utils/sortProjects";
import { sortProjectsByActivity } from "@/shared/lib/utils/sortProjectsByActivity";
import { Challenge, Habit, Project, Task } from "@prisma/client";
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
  "Week" = "Week",
  "Month" = "Month",
}

export const DATES: DateType[] = [
  DateType.Today,
  DateType.Week,
  DateType.Month,
];

// export type TaskType = Task & { isFavorite: boolean };

type OverviewDataType = {
  // activityFeed: [];
  overdueTaskAmount: number;
  projectAmount: number;
  totalTaskAmount: number;
  projects: any[];
  userName: string;
  tasks: TaskType[];
  habits: Habit[];
  challenges: Challenge[];
};

type ProductivityDataType = {
  activity: {
    maxActivity: number;
    allProjects: number;
    allTasks: number;
    days: {
      taskAmount: number;
      title: string;
    }[];
  };
  projects: any[];
};

export interface ProjectsState {
  overviewData: OverviewDataType;
  productivityData: ProductivityDataType;
  activeFilter: FilterType;
  dateType: DateType;
  scrollY: number;
  isWeekTasksShowed: boolean;
  setOverviewData: (newData: OverviewDataType) => void;
  setProductivityData: (newData: ProductivityDataType) => void;
  setActiveFilter: (newFilter: FilterType) => void;
  toggleWeekTasksShowed: () => void;
  setDateType: (newDateType: DateType) => void;
  setScrollY: (newScrollY: number) => void;
}

export const useDashboardStore = create<ProjectsState>((set, get) => ({
  overviewData: {
    // activityFeed: [],
    overdueTaskAmount: 0,
    projectAmount: 0,
    totalTaskAmount: 0,
    projects: [],
    userName: "",
    tasks: [],
    habits: [],
    challenges: [],
  },
  productivityData: {
    activity: {
      maxActivity: 0,
      allProjects: 0,
      allTasks: 0,
      days: [],
    },
    projects: [],
  },
  dateType: DATES[0],
  isWeekTasksShowed: false,
  activeFilter: FILTERS[0],
  scrollY: 0,
  toggleWeekTasksShowed: () =>
    set((state) => ({ isWeekTasksShowed: !state.isWeekTasksShowed })),
  setOverviewData: (newData) =>
    set(() => {
      newData.tasks = newData.tasks.map((task) => ({
        ...task,
        isFavorite: false,
      }));

      return {
        overviewData: { ...newData },
      };
    }),

  setProductivityData: (newData) =>
    set(() => ({ productivityData: { ...newData } })),

  setActiveFilter: (newActiveFilter) =>
    set(() => ({
      activeFilter: newActiveFilter,
    })),

  setDateType(newDateType) {
    set(() => ({ dateType: newDateType }));
  },

  setScrollY(newScrollY) {
    set(() => ({ scrollY: newScrollY }));
  },
}));
