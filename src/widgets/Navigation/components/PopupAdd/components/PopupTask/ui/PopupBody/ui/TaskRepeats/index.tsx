import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { FC } from "react";
import { setTaskRepeats } from "../../../../store/addTaskSlice";

export type RepeatsOptionType = "Once" | "Everyday";
export const REPEATS_OPTIONS: RepeatsOptionType[] = ["Once", "Everyday"];

export const TaskRepeats: FC = () => {
  const dispatch = useAppDispatch();
  const activeRepeatsOption = useAppSelector(
    (state) => state.addTask.activeRepeatsOption
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
          onChange={(e) =>
            dispatch(setTaskRepeats(e.target.value as RepeatsOptionType))
          }
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
