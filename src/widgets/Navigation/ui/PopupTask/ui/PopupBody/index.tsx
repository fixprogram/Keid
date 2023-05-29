import AddButton from "@/shared/ui/AddButton";
import { useTaskFormSubmit } from "@/widgets/Navigation/hooks/useTaskFormSubmit";
import { FC } from "react";
import { shallow } from "zustand/shallow";
import { usePopupTaskStore } from "../../popupTaskStore";
import { InputTaskName } from "../InputTaskName";
import { SelectProject } from "../SelectProject";
import { TaskDeadline } from "../TaskDeadline";
import { TaskRepeats } from "../TaskRepeats";

export const PopupBody: FC = () => {
  const handleFormSubmit = useTaskFormSubmit();

  const [isWithDeadline, toggleTaskWithDeadline] = usePopupTaskStore(
    (state) => [state.isWithDeadline, state.toggleTaskWithDeadline],
    shallow
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
                onChange={toggleTaskWithDeadline}
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
};
