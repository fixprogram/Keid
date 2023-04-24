import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Icon from "@/shared/ui/Icon";
import PopupLine from "@/shared/ui/PopupLine";
import { SETTINGS } from "../../config/settings";
import { closeSettings } from "../../store/subtaskSlice";

export default function TaskSettings() {
  const dispatch = useAppDispatch();
  const settingsOpened = useAppSelector(
    (state) => state.subtask.settingsOpened
  );

  const handleClosePopup = () => dispatch(closeSettings());

  return (
    <PopupWithOverlay
      isShowed={settingsOpened}
      onClose={handleClosePopup}
      positioned="Bottom"
    >
      <PopupLine />

      <b className="uppercase font-bold text-deactive text-xxs mt-4">
        Subtask settings
      </b>

      <ul className="mt-6">
        {SETTINGS.map((setting, index) => (
          <li
            key={setting.title}
            className={`border-b-[1px] border-white/5 flex items-center gap-5 ${
              index === 0 ? "pb-5" : "py-5"
            }`}
            onClick={setting.hook()}
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
}
