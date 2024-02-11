import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { FC } from "react";

interface HabitProgressPropsType {
  style: string;
  progress: number;
}

export const HabitProgress: FC<HabitProgressPropsType> = ({
  style,
  progress,
}) => {
  const habitStyle = projectStyles[style as ProjectStyleKey];

  return (
    <div className="w-full h-1 mt-2 bg-deactive rounded-full">
      <div
        className="h-full rounded-full"
        style={{
          background: habitStyle.gradient,
          width: `${progress > 100 ? 100 : progress}%`,
        }}
      />
    </div>
  );
};
