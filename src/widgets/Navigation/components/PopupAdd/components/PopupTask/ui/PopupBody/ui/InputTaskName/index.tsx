import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { SyntheticEvent, useCallback, useEffect } from "react";
import {
  openStyleList,
  setTaskName,
  setTaskStyle,
} from "../../../../store/addTaskSlice";

export default function InputTaskName() {
  const dispatch = useAppDispatch();
  const taskName = useAppSelector((state) => state.addTask.taskName);
  const taskStyle = useAppSelector((state) => state.addTask.taskStyle);
  const activeProject = useAppSelector((state) => state.addTask.taskProject);
  const error = useAppSelector((state) => state.addTask.error);

  useEffect(() => {
    if (taskStyle === "") {
      dispatch(setTaskStyle(activeProject.style));
    }
  }, [taskStyle, activeProject.style, dispatch]);

  const handleTaskNameChange = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      return dispatch(setTaskName(target.value));
    },
    [dispatch]
  );

  const style = projectStyles[taskStyle as keyof ProjectStyleType];

  if (!style) {
    return null;
  }

  return (
    <div className="flex items-end mt-4">
      <button
        type="button"
        className="w-4 h-4 rounded mr-4 mb-[5px]"
        style={{ background: style.gradient }}
        onClick={() => dispatch(openStyleList())}
      ></button>

      <input
        type="text"
        name="name"
        placeholder="Task Name..."
        className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
        style={{ background: "inherit" }}
        value={taskName}
        onChange={handleTaskNameChange}
      />

      <p>{error}</p>
    </div>
  );
}
