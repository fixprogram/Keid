import { FC, SyntheticEvent, useCallback } from "react";
import { usePopupProjectStore } from "../../popupProjectStore";
import { PopupStyleButton } from "../PopupStyleButton";
import { shallow } from "zustand/shallow";

export const PopupInputProjectName: FC = () => {
  const [projectName, error, setProjectName] = usePopupProjectStore(
    (state) => [state.projectName, state.error, state.setProjectName],
    shallow
  );
  const handleProjectNameChange = useCallback(
    (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      return setProjectName(target.value);
    },
    [setProjectName]
  );
  return (
    <div className="flex items-end">
      <PopupStyleButton />

      <input
        type="text"
        name="name"
        placeholder="Project Name..."
        className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
        style={{ background: "inherit" }}
        value={projectName}
        onChange={handleProjectNameChange}
        autoComplete="off"
      />

      <p>{error}</p>
    </div>
  );
};
