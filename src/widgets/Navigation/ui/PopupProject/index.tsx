import { useEffect } from "react";
import { useNavigationStore } from "../../model/navigationStore";
import PopupBody from "./ui/PopupBody";
import { PopupStyleList } from "./ui/PopupStyleList";
import { usePopupProjectStore } from "./popupProjectStore";

export default function PopupProject() {
  const [isStyleListOpened, setProjectStyle] = usePopupProjectStore((state) => [
    state.isStyleListOpened,
    state.setProjectStyle,
  ]);
  const projectAmount = useNavigationStore((state) => state.projectAmount);

  useEffect(() => {
    setProjectStyle(projectAmount <= 6 ? `0${projectAmount + 1}` : "01");
  }, [setProjectStyle, projectAmount]);

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  return <PopupBody />;
}
