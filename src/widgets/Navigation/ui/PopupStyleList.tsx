import StyleList from "@/features/StyleList";
import { usePopupStore } from "@/widgets/Navigation/model/usePopupStore";
import { FC, useRef } from "react";
import { shallow } from "zustand/shallow";

export const PopupStyleList: FC = () => {
  const [projectStyle, setProjectStyle, closeStyleList] = usePopupStore(
    (state) => [state.style, state.setStyle, state.closeStyleList],
    shallow
  );
  const initialStyle = useRef({ projectStyle });

  function setStyle(style: string) {
    setProjectStyle(style);
  }

  function cancelStyleList() {
    setStyle(initialStyle.current.projectStyle);
    closeStyleList();
  }

  function saveStyle() {
    closeStyleList();
  }

  return (
    <StyleList
      projectStyle={projectStyle}
      setStyle={setStyle}
      cancelStyleList={cancelStyleList}
      saveStyle={saveStyle}
    />
  );
};
