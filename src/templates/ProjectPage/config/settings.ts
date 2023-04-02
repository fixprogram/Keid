import { useDeleteProject } from "../hooks/useDeleteProject";

export const SETTINGS = [
  {
    iconName: "delete",
    title: "Delete Project",
    colorClass: "text-red",
    hook: useDeleteProject,
  },
];
