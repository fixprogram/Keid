import DueDate from "@/features/DueDate";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { FC } from "react";
import { shallow } from "zustand/shallow";
import { usePopupTaskStore } from "../../popupTaskStore";

export const TaskDeadline: FC = () => {
  const [deadline, openCalendar] = usePopupTaskStore(
    (state) => [state.deadline, state.openCalendar],
    shallow
  );
  const date = getDateString(new Date(deadline), false);

  return <DueDate date={date} onClick={openCalendar} />;
};
