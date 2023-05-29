import { FC, SyntheticEvent, useCallback, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { PopupStyleButton } from "../PopupStyleButton";
import { usePopupTaskStore } from "../../popupTaskStore";

export const InputTaskName: FC = () => {
  const [taskName, error, setTaskName] = usePopupTaskStore(
    (state) => [state.taskName, state.error, state.setTaskName],
    shallow
  );

  const handleTaskNameChange = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLInputElement;
      return setTaskName(target.value);
    },
    [setTaskName]
  );

  return (
    <div className="flex items-end mt-4">
      <PopupStyleButton />

      <input
        type="text"
        name="name"
        placeholder="Task Name..."
        className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
        style={{ background: "inherit" }}
        value={taskName}
        onChange={handleTaskNameChange}
        autoComplete="off"
      />

      <p>{error}</p>
    </div>
  );
};
