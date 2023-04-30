import StyleList from "@/features/StyleList";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useRef } from "react";
import { closeStyleList, setProjectStyle } from "../../store/addProjectSlice";

export default function PopupStyleList() {
  const dispatch = useAppDispatch();
  const projectStyle = useAppSelector((state) => state.addProject.projectStyle);
  const initialStyle = useRef({ projectStyle });

  function setStyle(style: string) {
    dispatch(setProjectStyle(style));
  }

  function cancelStyleList() {
    setStyle(initialStyle.current.projectStyle);
    dispatch(closeStyleList());
  }

  function saveStyle() {
    dispatch(closeStyleList());
  }

  return (
    <StyleList
      projectStyle={projectStyle}
      setStyle={setStyle}
      cancelStyleList={cancelStyleList}
      saveStyle={saveStyle}
    />
  );
}
