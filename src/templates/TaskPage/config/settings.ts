import { useDeleteTask } from "../hooks/useDeleteTask";

export const SETTINGS = [
  {
    iconName: "delete",
    title: "Delete Task",
    colorClass: "text-red",
    hook: useDeleteTask,
  },
];
