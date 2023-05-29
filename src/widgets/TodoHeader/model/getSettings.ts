import { ItemType } from "@/shared/config/types";
import { useDeleteItem } from "@/shared/model/useDeleteItem";

export const getSettings = (todoType: ItemType) => {
  return [
    {
      iconName: "delete",
      title: `Delete ${todoType}`,
      colorClass: "text-red",
      hook: useDeleteItem,
    },
  ];
};
