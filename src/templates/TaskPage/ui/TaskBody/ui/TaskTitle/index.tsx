import { useTextareaHeight } from "@/shared/lib/hooks/useTextareaHeight";
import { useUpdateTaskTitle } from "@/templates/TaskPage/hooks/useUpdateTaskTitle";
import { FC, useEffect, useRef, useState } from "react";

interface TaskTitlePropsType {
  initialTitle: string;
}

export const TaskTitle: FC<TaskTitlePropsType> = ({ initialTitle }) => {
  const { title, textareaHeight, handleTextareaChange } =
    useTextareaHeight(initialTitle);

  const handleUpdateTaskTitle = useUpdateTaskTitle();
  const handleTextareaBlur = () => {
    if (title.trim() !== initialTitle) {
      handleUpdateTaskTitle(title.trim());
    }
  };

  return (
    <div className="relative">
      <textarea
        value={title}
        onChange={handleTextareaChange}
        className="text-xxl text-poppins text-white mt-8 font-semibold w-full"
        style={{ backgroundColor: "inherit", overflowY: "hidden" }}
        rows={textareaHeight}
        onBlur={handleTextareaBlur}
      />
    </div>
  );
};
