import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import Icon from "@/shared/ui/Icon";
import PopupLine from "@/shared/ui/PopupLine";
import { FC } from "react";
import { SETTINGS } from "../config/consts";

export const TaskSettings: FC = () => {
  return (
    <PopupWithOverlay
      positioned="Top"
      btn={<Icon name="settings" height={24} width={24} />}
    >
      <PopupLine />

      <b className="uppercase font-bold text-deactive text-xxs mt-4">
        Task settings
      </b>

      <ul className="mt-6">
        {SETTINGS.map((setting, index) => (
          <li
            key={setting.title}
            className={`border-b-[1px] border-white/5 flex items-center gap-5 ${
              index === 0 ? "pb-5" : "py-5"
            }`}
            onClick={setting.hook("task")}
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
