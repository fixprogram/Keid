import StyleList from "@/features/StyleList";
import { FC, useRef } from "react";
import { shallow } from "zustand/shallow";
import { usePopupHabitStore } from "../../popupHabitStore";

export const PopupStyleList: FC = () => {
  const [habitStyle, setHabitStyle, closeStyleList] = usePopupHabitStore(
    (state) => [state.habitStyle, state.setHabitStyle, state.closeStyleList],
    shallow
  );
  const initialStyle = useRef({ habitStyle });

  function setStyle(style: string) {
    setHabitStyle(style);
  }

  function cancelStyleList() {
    setStyle(initialStyle.current.habitStyle);
    closeStyleList();
  }

  function saveStyle() {
    closeStyleList();
  }

  return (
    <StyleList
      projectStyle={habitStyle}
      setStyle={setStyle}
      cancelStyleList={cancelStyleList}
      saveStyle={saveStyle}
    />
  );
};
