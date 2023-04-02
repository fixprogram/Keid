import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Calendar from "@/shared/ui/Calendar";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import useInitialDeadline from "@/widgets/Navigation/hooks/useInitialDeadline";
import { useDispatch } from "react-redux";
import { setCalendarClose, setTaskDeadline } from "../../store/addTaskSlice";

export default function PopupCalendar() {
  const dispatch = useDispatch();
  const deadline = useAppSelector((state) => state.addTask.deadline);
  const initialDeadline = useInitialDeadline(deadline);

  const date = new Date(JSON.parse(deadline));

  function setDeadline(deadline: Date) {
    dispatch(setTaskDeadline(JSON.stringify(deadline)));
  }

  function cancelCalendar() {
    setDeadline(initialDeadline);
    dispatch(setCalendarClose());
  }

  function saveDeadline() {
    dispatch(setCalendarClose());
  }

  return (
    <section className="px-5 pb-6">
      <Calendar date={date} setDate={setDeadline} />;
      <div className="flex justify-between items-end mt-[20px]">
        <button
          type="button"
          onClick={cancelCalendar}
          className="text-red font-bold py-3 px-8"
        >
          Cancel
        </button>
        <div className="w-[100px]">
          <PrimaryButton text="Done" onClick={saveDeadline} />
        </div>
      </div>
    </section>
  );
}
