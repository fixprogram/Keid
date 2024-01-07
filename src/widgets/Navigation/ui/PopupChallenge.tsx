import { shallow } from "zustand/shallow";
import { PopupCalendar } from "./PopupCalendar";
import { PopupStyleList } from "./PopupStyleList";
import { usePopupStore } from "../model/usePopupStore";
import AddButton from "@/shared/ui/AddButton";
import { PopupDeadline } from "./PopupDeadline";
import { PopupInputTitle } from "./PopupInputTitle";
import { PopupSelectProject } from "./PopupSelectProject";
import { useTaskFormSubmit } from "../model/useTaskFormSubmit";
import { useChallengeFormSubmit } from "../model/useChallengeFormSubmit";
import { PopupMembersButton } from "./PopupMembersButton";
import Icon from "@/shared/ui/Icon";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { PopupMembers } from "./PopupMembers";
import { PopupPoints } from "./PopupPoints";

export default function PopupChallenge() {
  const handleFormSubmit = useChallengeFormSubmit();
  const [isCalendarOpen, isMembersOpened, isStyleListOpened] = usePopupStore(
    (state) => [
      state.isCalendarOpened,
      state.isMembersOpened,
      state.isStyleListOpened,
    ],
    shallow
  );

  if (isCalendarOpen) return <PopupCalendar />;

  if (isStyleListOpened) {
    return <PopupStyleList />;
  }

  if (isMembersOpened) {
    return <PopupMembers />;
  }

  return (
    <section className="pb-16 my-5">
      <form method="post" onSubmit={handleFormSubmit}>
        {/* <PopupSelectProject /> */}

        <PopupInputTitle placeholder="Challenge title..." />

        <div className="flex justify-between mt-6">
          <PopupDeadline />

          <PopupMembersButton />
        </div>

        <div className="mt-6 flex justify-between">
          <PopupPoints />
        </div>

        <div className="absolute right-[20px] bottom-[26px]">
          <AddButton type="submit" />
        </div>
      </form>
    </section>
  );
}
