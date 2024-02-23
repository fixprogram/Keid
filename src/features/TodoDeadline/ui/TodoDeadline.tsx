import { useTaskStore } from "@/entities/task/models/taskStore";
import DueDate from "@/shared/components/DueDate";
import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { ItemType } from "@/shared/config/types";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { Calendar } from "@/shared/ui/Calendar";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { FC, useCallback, useState } from "react";
import { useUpdateTodoDeadline } from "../model/useUpdateTodoDeadline";

interface TodoDeadlinePropType {
  style: string;
  deadline: Date;
  todoType: ItemType;
}

export const TodoDeadline: FC<TodoDeadlinePropType> = ({
  style,
  deadline,
  todoType,
}) => {
  const [newDeadline, setNewDeadline] = useState<Date | null>(deadline);
  const [isClosed, setClosed] = useState(false);

  const taskStyle = projectStyles[style as ProjectStyleKey];

  const handleUpdateTodoDeadline = useUpdateTodoDeadline(todoType);

  const formattedDeadline = getDateString(new Date(deadline), false);

  const handleSaveNewDeadline = () => {
    if (deadline !== newDeadline) {
      handleUpdateTodoDeadline(newDeadline);
      handleClose();
    }
  };

  const handleClose = useCallback(() => {
    setClosed(true);
  }, []);

  if (deadline === null) {
    return null;
  }
  return (
    <PopupWithOverlay
      btn={
        <div onClick={() => setClosed(false)}>
          <DueDate
            date={formattedDeadline}
            dateColor={taskStyle.background}
            circleColor={"#246BFD"}
          />
        </div>
      }
      positioned="BottomFullWidth"
      isBlack
      isClosed={isClosed}
    >
      <Calendar
        date={newDeadline ?? undefined}
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
                setNewDeadline(new Date());
              }
              if (!e.target.checked) {
                setNewDeadline(null);
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
          onClick={handleClose}
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
