import { sortProjects } from "@/shared/lib/utils/sortProjects";
import { create } from "zustand";
export type ProjectType = {
  id: string;
  title: string;
  style: string;
  taskAmount: number;
  completedTaskAmount: number;
  projectProgress: number;
  isStarred: boolean;
  isArchived: boolean;
  taskIds: [];
  completed: number;
};

type ListStyleType = "column" | "grid";

export type FilterType = "Active" | "Completed" | "Archived";
const FILTERS: FilterType[] = ["Active", "Completed", "Archived"];

type DataType = {
  projects: ProjectType[];
  userId: string;
  userProjectNames: string[];
};

export interface ProjectsState {
  data: DataType;
  activeFilter: FilterType;
  filteredProjects: Record<FilterType, ProjectType[]>;
  activeProjects: ProjectType[];
  setActiveFilter: (newActiveFilter: FilterType) => void;

  listStyle: ListStyleType;
  toggleListStyle: () => void;
  setData: (newData: DataType) => void;
}

export const useProjectsStore = create<ProjectsState>((set, get) => ({
  data: { projects: [], userId: "", userProjectNames: [] },
  filteredProjects: { Active: [], Completed: [], Archived: [] },
  activeProjects: [],
  activeFilter: FILTERS[0],
  listStyle: "column",
  toggleListStyle: () =>
    set(() => ({
      listStyle: get().listStyle === "column" ? "grid" : "column",
    })),
  setActiveFilter: (newActiveFilter: FilterType) =>
    set(() => ({
      activeFilter: newActiveFilter,
      activeProjects: get().filteredProjects[newActiveFilter],
    })),
  setData: (newData: DataType) =>
    set(() => {
      const sortedProjects = sortProjects<ProjectType>(newData.projects);

      const filteredProjects: Record<FilterType, ProjectType[]> = {
        Active: sortedProjects.filter(
          (project) => project.taskIds.length > 0 && project.completed === 0
        ),

        Completed: sortedProjects.filter((project) => project.completed), // For test purposes. In the future we add a field 'Completed' to projects

        Archived: sortedProjects.filter((project) => project.isArchived),
      };

      return {
        data: newData,
        filteredProjects,
        activeProjects: filteredProjects[get().activeFilter],
      };
    }),
}));
