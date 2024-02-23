import { ItemType } from "@/shared/config/types";
import { useAutosizeTextarea } from "@/shared/lib/hooks/useAutosizeTextarea";
import { FC, MutableRefObject, useRef } from "react";
import { useUpdateTodoTitle } from "../model/useUpdateTodoTitle";

interface TodoTitlePropsType {
  initialTitle: string;
  todoType: ItemType;
}

export const TodoTitle: FC<TodoTitlePropsType> = ({
  initialTitle,
  todoType,
}) => {
  const handleUpdateTodoTitle = useUpdateTodoTitle(todoType);

  const handleTextareaBlur = (title: string) => {
    if (title.trim() !== initialTitle) {
      handleUpdateTodoTitle(title.trim());
    }
  };

  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const { value, handleValueChange } = useAutosizeTextarea(
    initialTitle,
    textareaRef as MutableRefObject<HTMLTextAreaElement>
  );

  return (
    <textarea
      value={value}
      onChange={handleValueChange}
      className="text-xxl text-poppins text-white font-bold w-full"
      style={{
        backgroundColor: "inherit",
        overflowY: "hidden",
        width: "100%",
        height: 42,
        resize: "none",
      }}
      onBlur={() => handleTextareaBlur(value)}
      ref={textareaRef}
    />
  );
};
