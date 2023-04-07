import DueDate from "@/features/DueDate";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { openPopupCalendar } from "../../store/addSubtaskSlice";

export default function SubtaskDeadline() {
  const dispatch = useAppDispatch();
  const deadline = useAppSelector((state) => state.addSubtask.deadline);

  const date = getDateString(new Date(JSON.parse(deadline)), false);

  function openCalendar() {
    dispatch(openPopupCalendar());
  }

  return (
    <div className="mt-4">
      <DueDate date={date} onClick={openCalendar} />
    </div>
  );
}
