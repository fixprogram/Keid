import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Icon from "@/shared/ui/Icon";
import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import PopupLine from "@/shared/ui/PopupLine";
import { Fragment } from "react";
import { SETTINGS } from "../../config/settings";
import { closeSettings } from "../../store/projectSlice";

export default function ProjectSettings() {
  const dispatch = useAppDispatch();
  const settingsOpened = useAppSelector(
    (state) => state.project.settingsOpened
  );

  return (
    <Fragment>
      <Popup
        isHidden={!settingsOpened}
        popupStyle={{
          hidden: { display: "none" },
          showed: { bottom: 12, left: 12, right: 12, zIndex: 30 },
        }}
      >
        <PopupLine />

        <b className="uppercase font-bold text-deactive text-xxs mt-4">
          Project settings
        </b>

        <ul className="mt-6">
          {SETTINGS.map((setting) => (
            <li
              key={setting.title}
              className="border-b-[1px] border-white/5 p-5 flex items-center gap-5"
              onClick={setting.hook()}
            >
              <Icon name={setting.iconName} width={16} height={16} />
              <b className={`text-lg font-bold ${setting.colorClass}`}>
                {setting.title}
              </b>
            </li>
          ))}
        </ul>
      </Popup>

      {settingsOpened ? (
        <div
          className="absolute top-0 left-0"
          onClick={() => dispatch(closeSettings())}
        >
          <Overlay />
        </div>
      ) : null}
    </Fragment>
  );
}
