import { useArchiveProject } from "../models/useArchiveProject";
import { useCompleteProject } from "../models/useCompleteProject";
import { useDeleteProject } from "../models/useDeleteProject";

export type ProjectFilterType = "Active" | "Completed" | "Archived";
export type ProjectScreenType = "Overview" | "Task List";

export const PROJECT_FILTERS: ProjectFilterType[] = [
  "Active",
  "Completed",
  "Archived",
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
    iconName: "archive",
    title: "Archive Project",
    colorClass: "text-white",
    hook: useArchiveProject,
  },
  {
    iconName: "delete",
    title: "Delete Project",
    colorClass: "text-red",
    hook: useDeleteProject,
  },
];
