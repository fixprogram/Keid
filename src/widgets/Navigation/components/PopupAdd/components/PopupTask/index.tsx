import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import PopupBody from "./ui/PopupBody";
import PopupStyleList from "./ui/PopupBody/ui/PopupStyleList";
import PopupCalendar from "./ui/PopupCalendar";

export default function PopupTask() {
  const isCalendarOpen = useAppSelector(
    (state) => state.addTask.isCalendarOpen
  );
  const isStyleListOpened = useAppSelector(
    (state) => state.addTask.isStyleListOpened
  );

  if (isCalendarOpen) return <PopupCalendar />;

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  return <PopupBody />;
}
