import { useDeleteItem } from "@/shared/model/useDeleteItem";

export const SETTINGS = [
  {
    iconName: "delete",
    title: "Delete Subtask",
    colorClass: "text-red",
    hook: useDeleteItem,
  },
];
