import StyleList from "@/features/StyleList";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useRef } from "react";
import { closeStyleList, setTaskStyle } from "../../../../store/addTaskSlice";

export default function PopupStyleList() {
  const dispatch = useAppDispatch();
  const taskStyle = useAppSelector((state) => state.addTask.taskStyle);
  const initialStyle = useRef({ taskStyle });

  function setStyle(style: string) {
    dispatch(setTaskStyle(style));
  }

  function cancelStyleList() {
    setStyle(initialStyle.current.taskStyle);
    dispatch(closeStyleList());
  }

  function saveStyle() {
    dispatch(closeStyleList());
  }

  return (
    <StyleList
      projectStyle={taskStyle}
      setStyle={setStyle}
      cancelStyleList={cancelStyleList}
      saveStyle={saveStyle}
    />
  );
}
