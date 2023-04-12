import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { getDateString } from "@/shared/lib/utils/getDateString";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { useDispatch } from "react-redux";
import { openPopup } from "./components/AddSubtaskPopup/store/addSubtaskSlice";
import CompletedSubtask from "./components/CompletedSubtask";
import SubtaskInProgress from "./components/SubtaskInProgress";

export default function SubtaskList() {
  const dispatch = useDispatch();
  const subtasks = useAppSelector((state) => state.task.subtasks);

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
                style="01"
              />
            )}
          </li>
        ))}
      </ul>

      <PrimaryButton
        type="button"
        text="Add subtask"
        onClick={() => dispatch(openPopup())}
      />
    </div>
  );
}
