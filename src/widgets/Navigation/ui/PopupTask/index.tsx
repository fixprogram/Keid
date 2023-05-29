import { shallow } from "zustand/shallow";
import { usePopupTaskStore } from "./popupTaskStore";
import { PopupBody } from "./ui/PopupBody";
import { PopupCalendar } from "./ui/PopupCalendar";
import { PopupStyleList } from "./ui/PopupStyleList";

export default function PopupTask() {
  const [isCalendarOpen, isStyleListOpened] = usePopupTaskStore(
    (state) => [state.isCalendarOpened, state.isStyleListOpened],
    shallow
  );

  if (isCalendarOpen) return <PopupCalendar />;

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  return <PopupBody />;
}
