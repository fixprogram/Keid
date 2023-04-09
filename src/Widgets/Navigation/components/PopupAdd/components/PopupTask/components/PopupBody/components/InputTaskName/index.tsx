import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { SyntheticEvent, useCallback } from "react";
import { setTaskName } from "../../../../store/addTaskSlice";

export default function InputTaskName() {
  const dispatch = useAppDispatch();
  const taskName = useAppSelector((state) => state.addTask.taskName);

  const error = useAppSelector((state) => state.addProject.error);

  const handleTaskNameChange = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      return dispatch(setTaskName(target.value));
    },
    [dispatch]
  );

  return (
    <div className="flex items-end mt-4">
      <button
        type="button"
        className="w-4 h-4 bg-primary rounded mr-4 mb-[5px]"
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
