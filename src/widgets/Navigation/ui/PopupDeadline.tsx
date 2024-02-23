import DueDate from "@/shared/components/DueDate";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { usePopupStore } from "@/widgets/Navigation/model/usePopupStore";
import { FC } from "react";
import { shallow } from "zustand/shallow";

export const PopupDeadline: FC = () => {
  const [deadline, openCalendar] = usePopupStore(
    (state) => [state.deadline, state.openCalendar],
    shallow
  );
  const date = getDateString(new Date(deadline), false);

  return <DueDate date={date} onClick={openCalendar} />;
};
