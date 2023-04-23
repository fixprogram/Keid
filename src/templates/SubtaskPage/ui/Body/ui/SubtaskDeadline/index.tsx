import DueDate from "@/features/DueDate";
import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { FC } from "react";

export const SubtaskDeadline: FC = () => {
  const deadline = useAppSelector((state) => state.subtask.deadline);
  const style = useAppSelector((state) => state.subtask.parentTaskStyle);

  const parentTaskStyle = projectStyles[style as keyof ProjectStyleType];

  if (deadline === 0) {
    return null;
  }

  const formattedDeadline = getDateString(new Date(deadline), false);

  return (
    <div className="flex flex-wrap items-end gap-6 mt-6">
      <DueDate
        date={formattedDeadline}
        dateColor={parentTaskStyle.background}
        circleColor={"#246BFD"}
      />
    </div>
  );
};
