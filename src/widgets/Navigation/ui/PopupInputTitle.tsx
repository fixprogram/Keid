import { FC, SyntheticEvent, useCallback } from "react";
import { PopupStyleButton } from "./PopupStyleButton";
import { shallow } from "zustand/shallow";
import { usePopupStore } from "@/widgets/Navigation/model/usePopupStore";

interface PopupInputTitlePropsType {
  placeholder: string;
}

export const PopupInputTitle: FC<PopupInputTitlePropsType> = ({
  placeholder = "Title...",
}) => {
  const [title, error, setTitle] = usePopupStore(
    (state) => [state.title, state.error, state.setTitle],
    shallow
  );
  const handleTitleChange = useCallback(
    (e: SyntheticEvent) => {
      const target = e.target as HTMLInputElement;
      return setTitle(target.value);
    },
    [setTitle]
  );
  return (
    <div className="flex items-end">
      <PopupStyleButton />

      <input
        type="text"
        name="name"
        placeholder={placeholder}
        className="block text-lg text-white font-bold border-none border-b border-b-background2 placeholder:text-deactive flex-grow"
        style={{ background: "inherit" }}
        value={title}
        onChange={handleTitleChange}
        autoComplete="off"
      />

      <p>{error}</p>
    </div>
  );
};
