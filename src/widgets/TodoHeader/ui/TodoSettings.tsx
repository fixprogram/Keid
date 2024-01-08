import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import { ItemType } from "@/shared/config/types";
import Icon from "@/shared/ui/Icon";
import PopupLine from "@/shared/ui/PopupLine";
import { FC } from "react";
import { getSettings } from "../model/getSettings";

interface TodoSettingsPropsType {
  todoType: ItemType;
}

export const TodoSettings: FC<TodoSettingsPropsType> = ({ todoType }) => {
  const settings = getSettings(todoType);
  return (
    <PopupWithOverlay
      positioned="Top"
      btn={<Icon name="settings" height={24} width={24} />}
    >
      <PopupLine />

      <b className="uppercase font-bold text-deactive text-xxs mt-4">
        {todoType} settings
      </b>

      <ul className="mt-6">
        {settings.map((setting, index, array) => (
          <li
            key={setting.title}
            className={`${
              index < array.length - 1 ? "border-b" : ""
            } border-white/5 flex items-center gap-5 ${
              index === 0 ? "pb-5" : "py-5"
            }`}
            onClick={setting.hook(todoType)}
          >
            <Icon name={setting.iconName} width={16} height={16} />
            <b className={`text-lg font-bold ${setting.colorClass}`}>
              {setting.title}
            </b>
          </li>
        ))}
      </ul>
    </PopupWithOverlay>
  );
};
