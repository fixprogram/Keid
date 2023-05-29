import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { FC, useEffect } from "react";
import { shallow } from "zustand/shallow";
import { usePopupTaskStore } from "../../popupTaskStore";

export const PopupStyleButton: FC = () => {
  const [taskStyle, activeProject, setTaskStyle, openStyleList] =
    usePopupTaskStore(
      (state) => [
        state.taskStyle,
        state.activeProject,
        state.setTaskStyle,
        state.openStyleList,
      ],
      shallow
    );
  const style = projectStyles[taskStyle as ProjectStyleKey];

  useEffect(() => {
    if (taskStyle === "") {
      setTaskStyle(activeProject.style);
    }
  }, [taskStyle, activeProject.style, setTaskStyle]);

  return (
    <button
      type="button"
      className="w-4 h-4 rounded mr-4 mb-[5px]"
      style={{ background: style.gradient }}
      onClick={openStyleList}
    />
  );
};
