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
  const initialDeadline = useInitialDeadline(deadline, isCalendarOpen);

  const date = new Date(deadline);

  const handleCancel = useCallback(() => {
    setTaskDeadline(initialDeadline);
    setPopupStyle("gray");
    closeCalendar();
  }, [closeCalendar, initialDeadline, setPopupStyle, setTaskDeadline]);

  const handleClose = useCallback(() => {
    setPopupStyle("gray");
    closeCalendar();
  }, [setPopupStyle, closeCalendar]);

  useEffect(() => {
    setPopupStyle("black");
  }, [setPopupStyle]);

  return (
    <section className="pb-6">
      <Calendar date={date} setDate={setTaskDeadline} />
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
