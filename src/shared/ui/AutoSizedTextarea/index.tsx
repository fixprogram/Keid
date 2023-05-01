import { useTextareaHeight } from "@/shared/lib/hooks/useTextareaHeight";
import { FC, useEffect, useLayoutEffect, useRef, useState } from "react";

interface AutoSizedTextareaPropsType {
  initialTitle: string;
  onBlur: (title: string) => void;
}

export const AutoSizedTextarea: FC<AutoSizedTextareaPropsType> = ({
  initialTitle,
  onBlur,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { title, textareaHeight, handleTextareaChange } = useTextareaHeight(
    initialTitle,
    textareaRef
  );

  return (
    <textarea
      value={title}
      onChange={handleTextareaChange}
      className="text-xxl text-poppins text-white font-semibold w-full"
      style={{ backgroundColor: "inherit", overflowY: "hidden" }}
      rows={textareaHeight}
      onBlur={() => onBlur(title)}
      ref={textareaRef}
    />
  );
};
