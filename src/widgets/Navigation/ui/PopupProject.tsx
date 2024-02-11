import { useEffect } from "react";
import { useNavigationStore } from "../model/useNavigationStore";
import { PopupStyleList } from "./PopupStyleList";
import { usePopupStore } from "../model/usePopupStore";
import { useProjectFormSubmit } from "../model/useProjectFormSubmit";
import { PopupInputTitle } from "./PopupInputTitle";
import AddButton from "@/shared/ui/AddButton";
import Icon from "@/shared/ui/Icon";

export default function PopupProject() {
  const [isStyleListOpened, setProjectStyle] = usePopupStore((state) => [
    state.isStyleListOpened,
    state.setStyle,
  ]);
  const handleFormSubmit = useProjectFormSubmit();
  const projectAmount = useNavigationStore((state) => state.projectAmount);

  useEffect(() => {
    setProjectStyle(projectAmount <= 6 ? `0${projectAmount + 1}` : "01");
  }, [setProjectStyle, projectAmount]);

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  return (
    <section className="px-5 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        <PopupInputTitle placeholder="Project title..." />

        <div className="mt-6">
          <span className="font-bold text-deactive uppercase text-xxs">
            Metrics
          </span>

          <Icon name="add" width={48} height={48} />
        </div>

        <div className="mt-6">
          <span className="font-bold text-deactive uppercase text-xxs">
            Privacy
          </span>
          <p className="text-white">Public</p>
        </div>

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
