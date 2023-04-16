import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { useDispatch } from "react-redux";
import { openPopup } from "../../../AddSubtaskPopup/store/addSubtaskSlice";
import CompletedSubtask from "../CompletedSubtask";
import SubtaskInProgress from "../SubtaskInProgress";

export default function SubtaskList() {
  const dispatch = useDispatch();
  const subtasks = useAppSelector((state) => state.task.subtasks);
  const taskStyle = useAppSelector((state) => state.task.style);

  const style = projectStyles[taskStyle as keyof ProjectStyleType];

  return (
    <div className="mt-6">
      <ul className="flex flex-col gap-2">
        {subtasks.map((subtask) => (
          <li key={subtask.id}>
            {subtask.completed ? (
              <CompletedSubtask
                link={`/subtasks/${subtask.id}`}
                title={subtask.title}
                completed={getDateString(
                  new Date(JSON.parse(subtask.completed)),
                  false
                )}
              />
            ) : (
              <SubtaskInProgress
                link={`/subtasks/${subtask.id}`}
                deadline={getDateString(
                  new Date(JSON.parse(subtask.deadline)),
                  false
                )}
                title={subtask.title}
                style={style}
              />
            )}
          </li>
        ))}
      </ul>

      <div className="mt-6">
        <PrimaryButton
          type="button"
          text="Add subtask"
          onClick={() => dispatch(openPopup())}
        />
      </div>
    </div>
  );
}
