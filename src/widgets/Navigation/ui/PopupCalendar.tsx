import { Calendar } from "@/shared/ui/Calendar";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import useInitialDeadline from "@/widgets/Navigation/model/useInitialDeadline";
import { usePopupStore } from "@/widgets/Navigation/model/usePopupStore";
import { shallow } from "zustand/shallow";
import { useNavigationStore } from "../model/useNavigationStore";
import { useCallback, useEffect } from "react";

export const PopupCalendar = () => {
  const setPopupStyle = useNavigationStore((state) => state.setPopupStyle);

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
  const date = useInitialDeadline(deadline, isCalendarOpen);

  const handleCancel = useCallback(() => {
    setTaskDeadline(date);
    setPopupStyle("gray");
    closeCalendar();
  }, [closeCalendar, date, setPopupStyle, setTaskDeadline]);

  const handleClose = useCallback(() => {
    setPopupStyle("gray");
    closeCalendar();
  }, [setPopupStyle, closeCalendar]);

  useEffect(() => {
    setPopupStyle("black");
  }, [setPopupStyle]);

  return (
    <section className="pb-6">
      <Calendar
        date={date ? new Date(date) : undefined}
        setDate={setTaskDeadline}
      />
      <div className="flex justify-between items-end mt-[20px]">
        <button
          type="button"
          onClick={handleCancel}
          className="text-red font-bold py-3 px-8"
        >
          Cancel
        </button>
        <div className="w-[100px]">
          <PrimaryButton text="Done" onClick={handleClose} />
        </div>
      </div>
    </section>
  );
};
