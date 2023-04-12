import DueDate from "@/features/DueDate";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { setCalendarOpen } from "../../../../store/addTaskSlice";

export default function TaskDeadline() {
  const dispatch = useAppDispatch();
  const deadline = useAppSelector((state) => state.addTask.deadline);

  const date = getDateString(new Date(JSON.parse(deadline)), false);

  function openCalendar() {
    dispatch(setCalendarOpen());
  }

  return (
    <div className="mt-6">
      <DueDate date={date} onClick={openCalendar} />
    </div>
  );
}