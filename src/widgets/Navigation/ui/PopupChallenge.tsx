import { shallow } from "zustand/shallow";
import { PopupCalendar } from "./PopupCalendar";
import { PopupStyleList } from "./PopupStyleList";
import { usePopupStore } from "../model/usePopupStore";
import AddButton from "@/shared/ui/AddButton";
import { PopupDeadline } from "./PopupDeadline";
import { PopupInputTitle } from "./PopupInputTitle";
import { PopupSelectProject } from "./PopupSelectProject";
import { useTaskFormSubmit } from "../hooks/useTaskFormSubmit";
import { useChallengeFormSubmit } from "../hooks/useChallengeFormSubmit";

export default function PopupChallenge() {
  const handleFormSubmit = useChallengeFormSubmit();
  const [isCalendarOpen, isStyleListOpened] = usePopupStore(
    (state) => [state.isCalendarOpened, state.isStyleListOpened],
    shallow
  );

  if (isCalendarOpen) return <PopupCalendar />;

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  return (
    <section className="pb-16 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <PopupSelectProject />

        <PopupInputTitle placeholder="Challenge title..." />

        <div className="flex justify-between mt-6">
          <PopupDeadline />
        </div>

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
