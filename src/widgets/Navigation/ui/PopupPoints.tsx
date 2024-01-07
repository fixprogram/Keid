import { usePopupStore } from "../model/usePopupStore";
import { FC } from "react";

export const PopupPoints: FC = () => {
  const [points, setPoints] = usePopupStore((state) => [
    state.points,
    state.setPoints,
  ]);

  return (
    <>
      <b className="text-lg text-white font-bold">Points: {points}</b>
      <input
        type="range"
        min="0"
        max="10"
        step={1}
        value={points}
        onChange={(e) => setPoints(Number(e.target.value))}
      />
    </>
  );
};
