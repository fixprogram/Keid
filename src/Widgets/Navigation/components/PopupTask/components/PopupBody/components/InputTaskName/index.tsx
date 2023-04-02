import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setTaskName } from "../../../../store/addTaskSlice";

export default function InputTaskName() {
  const dispatch = useDispatch();
  const taskName = useAppSelector((state) => state.addTask.taskName);

  const error = useAppSelector((state) => state.addProject.error);

  const handleTaskNameChange = useCallback(
    (e) => {
      return dispatch(setTaskName(e.target.value));
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
