import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
import Icon from "@/shared/ui/Icon";
import { Fragment } from "react";
import { useDispatch } from "react-redux";
import { setCalendarOpen } from "../../../../store/addTaskSlice";

export default function TaskDeadline() {
  const dispatch = useDispatch();
  const deadline = useAppSelector((state) => state.addTask.deadline);

  const date = getDateString(new Date(JSON.parse(deadline)), false);

  function openCalendar() {
    dispatch(setCalendarOpen());
  }

  return (
    <Fragment>
      <div className="flex gap-3 mt-6 cursor-pointer" onClick={openCalendar}>
        <div className="rounded-full flex items-center justify-center w-12 h-12 bg-green">
          <Icon name="calendar" width={24} height={24} />
        </div>
        <div>
          <p className="text-deactive font-medium text-sm">Due Date</p>
          <b className="font-semibold text-green">{date}</b>
        </div>
      </div>
    </Fragment>
  );
}
