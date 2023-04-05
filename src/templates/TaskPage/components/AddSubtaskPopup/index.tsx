import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
import InputTaskName from "@/widgets/Navigation/components/PopupAdd/components/PopupTask/components/PopupBody/components/InputTaskName";
import TaskDeadline from "@/widgets/Navigation/components/PopupAdd/components/PopupTask/components/PopupBody/components/TaskDeadline";
import PopupCalendar from "@/widgets/Navigation/components/PopupAdd/components/PopupTask/components/PopupCalendar";
import SubtaskDeadline from "./components/SubtaskDeadline";

export default function AddSubtaskPopup() {
  //   const handleFormSubmit = useTaskFormSubmit();

  const isCalendarOpen = useAppSelector(
    (state) => state.addSubtask.isCalendarOpen
  );

  if (isCalendarOpen) return <PopupCalendar />;

  return (
    <section className="px-5 pb-16 my-5">
      <form method="post" onSubmit={() => {}}>
        <InputTaskName />

        <SubtaskDeadline />

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
