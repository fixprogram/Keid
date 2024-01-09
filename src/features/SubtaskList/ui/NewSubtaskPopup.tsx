// import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import { FC } from "react";
import { shallow } from "zustand/shallow";
import { useSubtaskListStore } from "../model/subtaskListStore";
import { useAddSubtask } from "../model/useAddSubtask";
import { MAX_WIDTH } from "@/shared/config/consts";
// import { useSubtaskFormSubmit } from "@/templates/TaskPage/hooks/useSubtaskFormSubmit";
// import AddSubtaskPopupCalendar from "../AddSubtaskPopupCalendar";
// import InputSubtaskTitle from "../InputSubtaskTitle";
// import SubtaskDeadline from "../SubtaskDeadline";

export const NewSubtaskPopup: FC = () => {
  const handleAddSubtask = useAddSubtask();
  const [isPopupOpened, closePopup] = useSubtaskListStore(
    (state) => [state.isPopupOpened, state.closePopup],
    shallow
  );
  // const isCalendarOpen = useAppSelector(
  //   (state) => state.addSubtask.isCalendarOpen
  // );

  // if (isCalendarOpen) return <AddSubtaskPopupCalendar />;

  const isDesktop =
    typeof window !== "undefined" && window.innerWidth > MAX_WIDTH;

  return (
    <>
      <section
        style={{
          position: "fixed",
          bottom: isPopupOpened ? 12 : -1000,
          left: isDesktop ? "initial" : 12,
          right: isDesktop ? "initial" : 12,
          zIndex: 30,
          // TODO: Delete these styles when there's a desktop version
          width: isDesktop ? MAX_WIDTH : "auto",
          marginLeft: isDesktop ? "-34px" : "auto",
        }}
        className="pt-1 pb-2 px-5 rounded-3xl bg-background2 drop-shadow-popup fixed left-3 right-3"
      >
        <section className="px-5 pb-16 my-5">
          <form method="post" onSubmit={handleAddSubtask}>
            {/* <SubtaskDeadline /> */}

            <div className="absolute right-[20px] bottom-[26px]">
              <AddButton type="submit" />
            </div>
          </form>
        </section>
      </section>
      <div onClick={closePopup}>
        <Overlay />
      </div>
    </>
  );
  //   return (
  //     <>
  //       <Popup
  //         isHidden={!isPopupOpened}
  //         popupStyle={{
  //           hidden: { top: -1000 },
  //           showed: { bottom: 12, left: 12, right: 12, zIndex: 30 },
  //         }}
  //       >
  //         <section className="px-5 pb-16 my-5">
  //           <form method="post" onSubmit={handleAddSubtask}>
  //             {/* <SubtaskDeadline /> */}

  //             <div className="absolute right-[20px] bottom-[26px]">
  //               <AddButton type="submit" />
  //             </div>
  //           </form>
  //         </section>
  //       </Popup>
  //       <div onClick={closePopup}>
  //         <Overlay />
  //       </div>
  //     </>
  //   );
};
