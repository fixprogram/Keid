import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { FC } from "react";

interface HabitProgressPropsType {
  style: string;
  streak: number;
  repeats: number;
}

export const HabitProgress: FC<HabitProgressPropsType> = ({
  style,
  streak,
  repeats,
}) => {
  const habitStyle = projectStyles[style as ProjectStyleKey];
  const progress = Math.floor((streak / repeats) * 100);
  const isOverdone = progress > 100;

  return (
    <div className="flex items-center">
      {isOverdone ? null : (
        <div
          className="h-[10px] w-10 bg-deactive rounded-full"
          style={{ transform: "rotate(-90deg)", marginLeft: -15 }}
        >
          <div
            className="h-full rounded-full"
            style={{
              background: habitStyle.gradient,
              width: `${progress}%`,
            }}
          />
        </div>
      )}

      <div className="flex flex-col" style={{ marginLeft: -3 }}>
        <b style={{ color: habitStyle.background }}>
          {isOverdone ? `${streak}` : `${streak}/${repeats}`}
        </b>
        <span style={{ color: habitStyle.background }}>days</span>
      </div>
    </div>
  );
};
