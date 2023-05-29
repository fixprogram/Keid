import StyleList from "@/features/StyleList";
import { FC, useRef } from "react";
import { shallow } from "zustand/shallow";
import { usePopupProjectStore } from "../../popupProjectStore";

export const PopupStyleList: FC = () => {
  const [projectStyle, setProjectStyle, closeStyleList] = usePopupProjectStore(
    (state) => [
      state.projectStyle,
      state.setProjectStyle,
      state.closeStyleList,
    ],
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
