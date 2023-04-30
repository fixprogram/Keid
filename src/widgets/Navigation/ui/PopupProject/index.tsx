import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useEffect } from "react";
import PopupBody from "./components/PopupBody";
import PopupStyleList from "./components/PopupStyleList";
import { setProjectStyle } from "./store/addProjectSlice";

export default function PopupProject() {
  const dispatch = useAppDispatch();

  const isStyleListOpened = useAppSelector(
    (state) => state.addProject.isStyleListOpened
  );

  const projectAmount = useAppSelector((state) => state.overview.projectAmount);

  useEffect(() => {
    dispatch(
      setProjectStyle(projectAmount <= 6 ? `0${projectAmount + 1}` : "01")
    );
  }, [dispatch, projectAmount]);

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  return <PopupBody />;
}
