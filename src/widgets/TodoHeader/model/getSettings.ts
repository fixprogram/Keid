import { useArchiveHabit } from "@/entities/habit";
import { ItemType } from "@/shared/config/types";
import { useDeleteItem } from "@/shared/model/useDeleteItem";

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

  if (todoType === "challenge") {
    settings.unshift({
      iconName: "archive",
      title: `Archive ${todoType}`,
      colorClass: "text-white",
      hook: useArchiveHabit, // TODO
    });
  }

  return settings;
};
