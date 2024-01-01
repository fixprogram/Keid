import { ItemType } from "@/shared/config/types";
import { useDeleteItem } from "@/shared/model/useDeleteItem";
import { useArchiveHabit } from "./useArchiveHabit";

export const getSettings = (todoType: ItemType) => {
  const settings = [
    {
      iconName: "delete",
      title: `Delete ${todoType}`,
      colorClass: "text-red",
      hook: useDeleteItem,
    },
  ];

  if (todoType === "habit") {
    settings.unshift({
      iconName: "archive",
      title: `Archive ${todoType}`,
      colorClass: "text-white",
      hook: useArchiveHabit,
    });
  }

  return settings;
};
