import DueDate from "@/features/DueDate";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { openPopupCalendar } from "../../store/addSubtaskSlice";

export default function SubtaskDeadline() {
  const dispatch = useAppDispatch();
  const deadline = useAppSelector((state) => state.addTask.deadline);

  const date = getDateString(new Date(JSON.parse(deadline)), false);

  function openCalendar() {
    dispatch(openPopupCalendar());
  }

  return <DueDate date={date} onClick={openCalendar} />;
}
