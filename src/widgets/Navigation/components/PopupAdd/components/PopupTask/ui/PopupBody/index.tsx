import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
import { useTaskFormSubmit } from "@/widgets/Navigation/hooks/useTaskFormSubmit";
import { toggleTaskWithDeadline } from "../../store/addTaskSlice";
import InputTaskName from "./ui/InputTaskName";
import SelectProject from "./ui/SelectProject";
import TaskDeadline from "./ui/TaskDeadline";
import { TaskRepeats } from "./ui/TaskRepeats";

export default function PopupBody() {
  const handleFormSubmit = useTaskFormSubmit();
  const dispatch = useAppDispatch();
  const isWithDeadline = useAppSelector(
    (state) => state.addTask.isWithDeadline
  );

  return (
    <section className="pb-16 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <SelectProject />

        <InputTaskName />

        <div className="flex justify-between mt-6">
          <div>
            <b className="text-lg text-white font-bold">With deadline</b>
            <div>
              <input
                type="checkbox"
                id="no_deadline"
                className="hidden peer"
                onChange={() => {
                  dispatch(toggleTaskWithDeadline());
                }}
                checked={isWithDeadline}
              />
              <label
                htmlFor="no_deadline"
                className="block w-[48px] h-[24px] bg-background2 rounded-full border-[1px] border-white/10 relative after:block after:w-5 after:h-5 after:rounded-full after:bg-deactiveCheck after:absolute after:top-[1px] after:left-[1px] after:shadow-switch peer-checked:bg-primary peer-checked:after:bg-white peer-checked:after:right-[2px] peer-checked:after:top-[2px] peer-checked:after:left-auto peer-checked:border-0"
              />
            </div>
          </div>
          {isWithDeadline ? <TaskDeadline /> : null}
        </div>

        <div className="flex justify-between mt-6">
          <TaskRepeats />
        </div>

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
