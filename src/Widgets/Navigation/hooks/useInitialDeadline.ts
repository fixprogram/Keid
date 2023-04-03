import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useRef, useEffect } from "react";

export default function useInitialDeadline(deadline: string) {
  const initialDeadline = useRef(deadline);
  const isCalendarOpen = useAppSelector(
    (state) => state.addTask.isCalendarOpen
  );

  useEffect(() => {
    if (isCalendarOpen) {
      initialDeadline.current = deadline;
    }
  }, [isCalendarOpen, deadline]);

  return JSON.parse(initialDeadline.current);
}
