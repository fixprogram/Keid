import Calendar from "@/shared/ui/Calendar";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import useInitialDeadline from "@/widgets/Navigation/model/useInitialDeadline";
import { usePopupStore } from "@/widgets/Navigation/model/usePopupStore";
import { shallow } from "zustand/shallow";

export const PopupCalendar = () => {
  const [deadline, isCalendarOpen, setTaskDeadline, closeCalendar] =
    usePopupStore(
      (state) => [
        state.deadline,
        state.isCalendarOpened,
        state.setDeadline,
        state.closeCalendar,
      ],
      shallow
    );
  const initialDeadline = useInitialDeadline(deadline, isCalendarOpen);

  const date = new Date(deadline);

  function cancelCalendar() {
    setTaskDeadline(initialDeadline);
    closeCalendar();
  }

  return (
    <section className="px-5 pb-6">
      <Calendar date={date} setDate={setTaskDeadline} />
      <div className="flex justify-between items-end mt-[20px]">
        <button
          type="button"
          onClick={cancelCalendar}
          className="text-red font-bold py-3 px-8"
        >
          Cancel
        </button>
        <div className="w-[100px]">
          <PrimaryButton text="Done" onClick={closeCalendar} />
        </div>
      </div>
    </section>
  );
};
