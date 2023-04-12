import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
import { useSubtaskFormSubmit } from "@/templates/TaskPage/hooks/useSubtaskFormSubmit";
import AddSubtaskPopupCalendar from "../AddSubtaskPopupCalendar";
import InputSubtaskTitle from "../InputSubtaskTitle";
import SubtaskDeadline from "../SubtaskDeadline";

export default function AddSubtaskPopupBody() {
  const handleSubtaskFormSubmit = useSubtaskFormSubmit();
  const isCalendarOpen = useAppSelector(
    (state) => state.addSubtask.isCalendarOpen
  );

  if (isCalendarOpen) return <AddSubtaskPopupCalendar />;

  return (
    <section className="px-5 pb-16 my-5">
      <form method="post" onSubmit={handleSubtaskFormSubmit}>
        <InputSubtaskTitle />

        <SubtaskDeadline />

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
