import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
// import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
// import { AutoSizedTextarea } from "@/shared/ui/AutoSizedTextarea";
// import { changeNewSubtaskText } from "@/templates/TaskPage/store/taskSlice";
import Link from "next/link";
import { SyntheticEvent, useState } from "react";
import { createPortal } from "react-dom";
import { shallow } from "zustand/shallow";
import { useSubtaskListStore } from "../model/subtaskListStore";
import { NewSubtaskPopup } from "./NewSubtaskPopup";

// type Props = {
//   link: string;
//   title: string;
//   deadline: string;
//   style: { background: string; gradient: string };
// };

export const NewSubtask = ({}) => {
  const [
    newSubtaskTitle,
    isPopupOpened,
    setNewSubtaskTitle,
    openPopup,
    closePopup,
  ] = useSubtaskListStore(
    (state) => [
      state.newSubtaskTitle,
      state.isPopupOpened,
      state.setNewSubtaskTitle,
      state.openPopup,
      state.closePopup,
    ],
    shallow
  );
  //   const [isFocused, setFocused] = useState(false);
  // const dispatch = useAppDispatch();
  // const text = useAppSelector((state) => state.task.newSubtaskText);

  // const handleInputChange = (event: SyntheticEvent) => {
  //   const target = event.target as HTMLInputElement;

  //   dispatch(changeNewSubtaskText(target.value));
  // };

  const handleInputChange = (event: SyntheticEvent) => {
    const target = event.target as HTMLInputElement;
    setNewSubtaskTitle(target.value);
  };

  return (
    // <Link href={link}>
    <div
      className="bg-background2 p-2 flex items-center gap-2 rounded-xl border-2"
      style={{ borderColor: isPopupOpened ? "#246BFD" : "transparent" }}
    >
      <div className="min-w-[24px] h-6 rounded-full border-2 border-deactive m-2"></div>

      <div className="flex flex-grow items-center gap-2 mr-3">
        <input
          type="text"
          value={newSubtaskTitle}
          placeholder="Add subtask..."
          onChange={handleInputChange}
          style={{
            backgroundColor: "inherit",
            zIndex: isPopupOpened ? 9999 : "auto",
          }}
          className="text-lg flex-grow text-white font-semibold"
          onFocus={openPopup}
          //   onBlur={closePopup}
        />

        {/* {text.length ? <AddButton /> : null} */}

        {/* <b className="text-lg flex-grow text-white font-semibold">{title}</b> */}
      </div>

      {isPopupOpened ? <NewSubtaskPopup /> : null}
    </div>
    // </Link>
  );
};
