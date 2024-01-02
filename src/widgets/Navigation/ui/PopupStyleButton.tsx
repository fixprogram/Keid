import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { usePopupStore } from "@/widgets/Navigation/model/usePopupStore";
import { FC } from "react";
import { shallow } from "zustand/shallow";

export const PopupStyleButton: FC = () => {
  const [projectStyle, openStyleList] = usePopupStore(
    (state) => [state.style, state.openStyleList],
    shallow
  );

  const style = projectStyles[projectStyle as ProjectStyleKey];

  return (
    <button
      type="button"
      className="w-4 h-4 bg-primary rounded mr-4 mb-[5px]"
      style={{ background: style.gradient }}
      onClick={() => openStyleList()}
    />
  );
};
