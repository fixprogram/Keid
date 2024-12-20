import { PopupCalendar } from "./PopupCalendar";
import { usePopupStore } from "../model/usePopupStore";
import { useTaskFormSubmit } from "../model/useTaskFormSubmit";
import { PopupSelectProject } from "./PopupSelectProject";
import { PopupInputTitle } from "./PopupInputTitle";
import { PopupDeadline } from "./PopupDeadline";
import AddButton from "@/shared/ui/AddButton";
import { PopupRepeatsOption } from "./PopupRepeatsOption";
import { PopupStyleList } from "./PopupStyleList";
import { PopupPoints } from "./PopupPoints";
import { PopupMetrics } from "./PopupMetrics";
import { useCallback, useState } from "react";

export default function PopupTask() {
  const handleFormSubmit = useTaskFormSubmit();
  const [isCalendarOpen, isStyleListOpened, deadline, setDeadline] =
    usePopupStore((state) => [
      state.isCalendarOpened,
      state.isStyleListOpened,
      state.deadline,
      state.setDeadline,
    ]);
  const [isWithDeadline, setWithDeadline] = useState(Boolean(deadline));

  const toggleTaskWithDeadline = useCallback(() => {
    if (isWithDeadline) {
      setWithDeadline(false);
      setDeadline(null);
    } else {
      setWithDeadline(true);
      setDeadline(new Date());
    }
  }, [setDeadline, setWithDeadline, isWithDeadline]);

  if (isCalendarOpen) return <PopupCalendar />;

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  return (
    <section className="pb-16 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <PopupSelectProject />

        <PopupInputTitle placeholder="Task title..." />

        <div className="flex justify-between mt-6">
          <div>
            <b className="text-lg text-white font-bold">With deadline</b>
            <div>
              <input
                type="checkbox"
                id="no_deadline"
                className="hidden peer"
                onChange={toggleTaskWithDeadline}
                checked={isWithDeadline}
              />
              <label
                htmlFor="no_deadline"
                className="block w-[48px] h-[24px] bg-background2 rounded-full border-[1px] border-white/10 relative after:block after:w-5 after:h-5 after:rounded-full after:bg-deactiveCheck after:absolute after:top-[1px] after:left-[1px] after:shadow-switch peer-checked:bg-primary peer-checked:after:bg-white peer-checked:after:right-[2px] peer-checked:after:top-[2px] peer-checked:after:left-auto peer-checked:border-0"
              />
            </div>
          </div>
          {isWithDeadline ? <PopupDeadline /> : null}
        </div>

        <div className="flex justify-between mt-6">
          <PopupRepeatsOption />
        </div>

        <PopupMetrics />

        <div className="flex justify-between mt-6">
          <PopupPoints />
        </div>

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
