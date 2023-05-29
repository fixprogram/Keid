import { useCompleteProject } from "../models/hooks/useCompleteProject";
import { useDeleteProject } from "../models/hooks/useDeleteProject";

export type ProjectFilterType = "Active" | "Dreams" | "Completed";
export type ProjectScreenType = "Overview" | "Task List";

export const PROJECT_FILTERS: ProjectFilterType[] = [
  "Active",
  "Dreams",
  "Completed",
];

export const PROJECT_SCREENS: ProjectScreenType[] = ["Overview", "Task List"];

export type SETTING_TYPE = {
  iconName: string;
  title: string;
  colorClass: string;
  hook: () => () => void;
};

export const SETTINGS: SETTING_TYPE[] = [
  {
    iconName: "complete",
    title: "Complete Project",
    colorClass: "text-green",
    hook: useCompleteProject,
  },
  {
    iconName: "delete",
    title: "Delete Project",
    colorClass: "text-red",
    hook: useDeleteProject,
  },
];
