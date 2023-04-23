import DueDate from "@/features/DueDate";
import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { FC } from "react";

export const TaskDeadline: FC = () => {
  const deadline = useAppSelector((state) => state.task.deadline);
  const style = useAppSelector((state) => state.task.style);
  const taskStyle = projectStyles[style as keyof ProjectStyleType];

  if (deadline === 0) {
    return null;
  }

  const formattedDeadline = getDateString(new Date(deadline), false);

  return (
    <DueDate
      date={formattedDeadline}
      dateColor={taskStyle.background}
      circleColor={"#246BFD"}
    />
  );
};
