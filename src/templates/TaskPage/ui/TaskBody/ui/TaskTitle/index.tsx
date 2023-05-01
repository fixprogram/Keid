import { useTextareaHeight } from "@/shared/lib/hooks/useTextareaHeight";
import { AutoSizedTextarea } from "@/shared/ui/AutoSizedTextarea";
import { useUpdateTaskTitle } from "@/templates/TaskPage/hooks/useUpdateTaskTitle";
import { FC, useEffect, useRef, useState } from "react";

interface TaskTitlePropsType {
  initialTitle: string;
}

export const TaskTitle: FC<TaskTitlePropsType> = ({ initialTitle }) => {
  const handleUpdateTaskTitle = useUpdateTaskTitle();
  const handleTextareaBlur = (title: string) => {
    if (title.trim() !== initialTitle) {
      handleUpdateTaskTitle(title.trim());
    }
  };

  return (
    <div className="mt-8">
      <AutoSizedTextarea
        initialTitle={initialTitle}
        onBlur={handleTextareaBlur}
      />
    </div>
  );
};
