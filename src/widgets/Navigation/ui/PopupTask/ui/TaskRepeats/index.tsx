import { REPEATS_OPTIONS } from "@/widgets/Navigation/config/consts";
import { RepeatsOptionType } from "@/widgets/Navigation/model/types";
import { FC } from "react";
import { shallow } from "zustand/shallow";
import { usePopupTaskStore } from "../../popupTaskStore";

export const TaskRepeats: FC = () => {
  const [activeRepeatsOption, setTaskRepeats] = usePopupTaskStore(
    (state) => [state.activeRepeatsOption, state.setTaskRepeats],
    shallow
  );

  return (
    <div className="flex gap-3 cursor-pointer">
      <div
        className={`rounded-full flex items-center justify-center w-12 h-12 `}
        style={{ backgroundColor: "#A5F59C" }}
      >
        <b>R</b>
      </div>
      <div>
        <p className="text-deactive font-medium text-sm">Repeats</p>
        <select
          className="text-white font-bold"
          style={{ background: "inherit" }}
          value={activeRepeatsOption}
          onChange={(e) => setTaskRepeats(e.target.value as RepeatsOptionType)}
        >
          {REPEATS_OPTIONS.map((repeatOption) => (
            <option key={repeatOption} value={repeatOption}>
              {repeatOption}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
