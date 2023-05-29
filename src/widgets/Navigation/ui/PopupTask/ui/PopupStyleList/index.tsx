import StyleList from "@/features/StyleList";
import { FC, useRef } from "react";
import { shallow } from "zustand/shallow";
import { usePopupTaskStore } from "../../popupTaskStore";

export const PopupStyleList: FC = () => {
  const [taskStyle, setTaskStyle, closeStyleList] = usePopupTaskStore(
    (state) => [state.taskStyle, state.setTaskStyle, state.closeStyleList],
    shallow
  );
  const initialStyle = useRef({ taskStyle });

  function setStyle(style: string) {
    setTaskStyle(style);
  }

  function cancelStyleList() {
    setStyle(initialStyle.current.taskStyle);
    closeStyleList();
  }

  function saveStyle() {
    closeStyleList();
  }

  return (
    <StyleList
      projectStyle={taskStyle}
      setStyle={setStyle}
      cancelStyleList={cancelStyleList}
      saveStyle={saveStyle}
    />
  );
};
