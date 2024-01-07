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

export interface ProjectsState {
  activeFilter: FilterType;
  dateType: DateType;
  scrollY: number;
  isWeekTasksShowed: boolean;
  setActiveFilter: (newFilter: FilterType) => void;
  toggleWeekTasksShowed: () => void;
  setDateType: (newDateType: DateType) => void;
  setScrollY: (newScrollY: number) => void;
}

export const useDashboardStore = create<ProjectsState>((set, get) => ({
  dateType: DATES[0],
  isWeekTasksShowed: false,
  activeFilter: FILTERS[0],
  scrollY: 0,
  toggleWeekTasksShowed: () =>
    set((state) => ({ isWeekTasksShowed: !state.isWeekTasksShowed })),

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
