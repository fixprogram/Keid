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
  taskIds: [];
  completed: number;
};

type ListStyleType = "column" | "grid";

export type FilterType = "Active" | "Dreams" | "Completed";
const FILTERS: FilterType[] = ["Active", "Dreams", "Completed"];

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
  filteredProjects: { Active: [], Dreams: [], Completed: [] },
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

        Dreams: sortedProjects.filter(
          (project) => project.taskIds.length === 0 && project.completed === 0
        ),

        Completed: sortedProjects.filter((project) => project.completed), // For test purposes. In the future we add a field 'Completed' to projects
      };

      return {
        data: newData,
        filteredProjects,
        activeProjects: filteredProjects[get().activeFilter],
      };
    }),
}));
