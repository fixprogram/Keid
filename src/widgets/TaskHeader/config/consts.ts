// import { useDeleteTask } from "../model/useDeleteTask";

import { useDeleteItem } from "@/shared/model/useDeleteItem";

export const SETTINGS = [
  {
    iconName: "delete",
    title: "Delete Task",
    colorClass: "text-red",
    hook: useDeleteItem,
  },
];
