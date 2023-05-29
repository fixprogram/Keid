import DueDate from "@/features/DueDate";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
// import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
// import { openCalendar } from "@/templates/TaskPage/store/taskSlice";
import { FC } from "react";

interface TaskDeadlinePropType {
  style: string;
  deadline: number;
}

export const TaskDeadline: FC<TaskDeadlinePropType> = ({ style, deadline }) => {
  // const dispatch = useAppDispatch();
  // const deadline = useAppSelector((state) => state.task.deadline);
  // const style = useAppSelector((state) => state.task.style);
  const taskStyle = projectStyles[style as ProjectStyleKey];

  // const handleOpenCalendar = () => dispatch(openCalendar());

  if (deadline === 0) {
    return null;
  }

  const formattedDeadline = getDateString(new Date(deadline), false);

  return (
    <DueDate
      date={formattedDeadline}
      dateColor={taskStyle.background}
      circleColor={"#246BFD"}
      // onClick={handleOpenCalendar}
    />
  );
};
