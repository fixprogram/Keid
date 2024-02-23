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
  const [isClosed, setClosed] = useState(false);

  const updatePoints = useUpdatePoints(todoType);

  const handleUpdatePoints = useCallback(() => {
    if (points !== initialPoints) {
      updatePoints(points);
    }
  }, [initialPoints, points, updatePoints]);

  let pointsColor = "#A5F59C";

  if (points > 3) {
    pointsColor = "#FFDD72";
  }

  if (points > 6) {
    pointsColor = "#FF968E";
  }

  const handleClose = useCallback(() => {
    setClosed(true);
  }, []);

  return (
    <PopupWithOverlay
      btn={
        <button
          className="font-bold"
          style={{
            lineHeight: "20px",
            fontSize: "12px",
            color: pointsColor,
            border: `2px solid ${pointsColor}`,
            borderRadius: 9999,
            width: 24,
            textAlign: "center",
          }}
          tabIndex={0}
        >
          {points}
        </button>
      }
      isClosed={isClosed}
      positioned="Top"
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
          onClick={handleClose}
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
