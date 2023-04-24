import DueDate from "@/features/DueDate";
import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { openCalendar } from "@/templates/TaskPage/store/taskSlice";
import { FC } from "react";

export const TaskDeadline: FC = () => {
  const dispatch = useAppDispatch();
  const deadline = useAppSelector((state) => state.task.deadline);
  const style = useAppSelector((state) => state.task.style);
  const taskStyle = projectStyles[style as keyof ProjectStyleType];

  const handleOpenCalendar = () => dispatch(openCalendar());

  if (deadline === 0) {
    return null;
  }

  const formattedDeadline = getDateString(new Date(deadline), false);

  return (
    <DueDate
      date={formattedDeadline}
      dateColor={taskStyle.background}
      circleColor={"#246BFD"}
      onClick={handleOpenCalendar}
    />
  );
};
