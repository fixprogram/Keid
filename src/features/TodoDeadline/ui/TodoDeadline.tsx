import { useTaskStore } from "@/entities/task/models/taskStore";
import DueDate from "@/features/DueDate";
import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { ItemType } from "@/shared/config/types";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { Calendar } from "@/shared/ui/Calendar";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { FC, useState } from "react";
import { useUpdateTodoDeadline } from "../model/useUpdateTodoDeadline";

interface TodoDeadlinePropType {
  style: string;
  deadline: number;
  todoType: ItemType;
}

export const TodoDeadline: FC<TodoDeadlinePropType> = ({
  style,
  deadline,
  todoType,
}) => {
  // const dispatch = useAppDispatch();
  // const deadline = useAppSelector((state) => state.task.deadline);
  // const style = useAppSelector((state) => state.task.style);
  const [newDeadline, setNewDeadline] = useState(deadline);

  const taskStyle = projectStyles[style as ProjectStyleKey];

  const handleUpdateTodoDeadline = useUpdateTodoDeadline(todoType);
  // const handleOpenCalendar = () => dispatch(openCalendar());

  const formattedDeadline = getDateString(new Date(deadline), false);

  const handleSaveNewDeadline = () => {
    if (deadline !== newDeadline) {
      return handleUpdateTodoDeadline(newDeadline);
    }
    // return handlePopupClose();
  };

  if (deadline === 0) {
    return null;
  }
  return (
    <PopupWithOverlay
      //   isShowed={isCalendarOpened}
      //   onClose={handlePopupClose}
      btn={
        <DueDate
          date={formattedDeadline}
          dateColor={taskStyle.background}
          circleColor={"#246BFD"}
        />
      }
      positioned="Bottom"
    >
      <Calendar
        date={new Date(newDeadline)}
        setDate={(date) => setNewDeadline(date)}
      />

      <div className="mt-5">
        <b className="text-lg text-white font-bold">With deadline</b>
        <div>
          <input
            type="checkbox"
            id="no_task_deadline"
            className="hidden peer"
            onChange={(e) => {
              if (e.target.checked) {
                setNewDeadline(Date.now());
              }
              if (!e.target.checked) {
                setNewDeadline(0);
              }
            }}
            checked={Boolean(newDeadline)}
          />
          <label
            htmlFor="no_task_deadline"
            className="block w-12 h-6 bg-background2 rounded-full border-[1px] border-white/10 relative after:block after:w-5 after:h-5 after:rounded-full after:bg-deactiveCheck after:absolute after:top-[1px] after:left-[1px] after:shadow-switch peer-checked:bg-primary peer-checked:after:bg-white peer-checked:after:right-[2px] peer-checked:after:top-[2px] peer-checked:after:left-auto peer-checked:border-0"
          />
        </div>
      </div>

      <div className="flex justify-between items-end mt-5">
        <button
          type="button"
          // onClick={handlePopupClose}
          className="text-red font-bold py-3 px-8"
        >
          Cancel
        </button>
        <div className="w-[100px]">
          <PrimaryButton text="Save" onClick={handleSaveNewDeadline} />
        </div>
      </div>
    </PopupWithOverlay>
  );
};
