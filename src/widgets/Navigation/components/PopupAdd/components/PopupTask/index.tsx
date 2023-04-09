import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import PopupBody from "./components/PopupBody";
import PopupCalendar from "./components/PopupCalendar";

export default function PopupTask() {
  const isCalendarOpen = useAppSelector(
    (state) => state.addTask.isCalendarOpen
  );

  if (isCalendarOpen) return <PopupCalendar />;

  return <PopupBody />;
}
