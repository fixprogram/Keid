import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import Icon from "@/shared/ui/Icon";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { FC, useCallback, useState } from "react";
import { useUpdatePoints } from "../model/useUpdatePoints";
import { ItemType } from "@/shared/config/types";

interface TodoPointsPropsType {
  todoType: ItemType;
  initialPoints: number;
}

export const TodoPoints: FC<TodoPointsPropsType> = ({
  todoType,
  initialPoints,
}) => {
  const [points, setPoints] = useState(initialPoints);

  const updatePoints = useUpdatePoints(todoType);

  const handleUpdatePoints = useCallback(() => {
    if (points !== initialPoints) {
      updatePoints(points);
    }
  }, [initialPoints, points, updatePoints]);

  return (
    <PopupWithOverlay
      btn={
        <div className="flex gap-3 cursor-pointer">
          <div
            className={`rounded-full flex items-center justify-center w-12 h-12 `}
            style={{
              background: "linear-gradient(180deg, #9ADB7F 0%, #6EA95C 100%)",
            }}
          >
            <Icon name="points" width={24} height={25} />
          </div>
          <div className="text-left">
            <p className="text-deactive font-medium text-sm">Points</p>
            <b className={`font-semibold`} style={{ color: "#A5F59C" }}>
              {points}
            </b>
          </div>
        </div>
      }
      positioned="Bottom"
    >
      <div className="mt-6 flex justify-between">
        <b className="text-lg text-white font-bold">Points: {points}</b>
        <input
          type="range"
          min="0"
          max="10"
          step={1}
          value={points}
          onChange={(e) => setPoints(Number(e.target.value))}
        />
      </div>

      <div className="flex justify-between items-end mt-5">
        <button
          type="button"
          // onClick={handlePopupClose}
          className="text-red font-bold py-3 px-8"
        >
          Cancel
        </button>
        <div className="w-[100px]">
          <PrimaryButton text="Save" onClick={handleUpdatePoints} />
        </div>
      </div>
    </PopupWithOverlay>
  );
};
