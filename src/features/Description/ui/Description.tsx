import { ItemType } from "@/shared/config/types";
import { useAutosizeTextarea } from "@/shared/lib/hooks/useAutosizeTextarea";
import { FC, MutableRefObject, useRef } from "react";
import { useUpdateDescription } from "../model/useUpdateDescription";

interface DescriptionPropsType {
  initialValue: string;
  itemType: ItemType;
}

export const Description: FC<DescriptionPropsType> = ({
  initialValue = "",
  itemType,
}) => {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { value, handleValueChange } = useAutosizeTextarea(
    initialValue,
    textareaRef as MutableRefObject<HTMLTextAreaElement>
  );
  const handleUpdateDescription = useUpdateDescription(itemType);

  const handleTextareaBlur = () => {
    if (value.trim() !== initialValue) {
      handleUpdateDescription(value.trim());
    }
  };

  return (
    <div className="mt-6">
      <p className="text-white text-sm font-medium">Description</p>
      <textarea
        value={value}
        onChange={handleValueChange}
        className="text-deactive text-sm font-inter"
        style={{
          backgroundColor: "inherit",
          overflowY: "hidden",
          width: "100%",
        }}
        onBlur={handleTextareaBlur}
        ref={textareaRef}
        placeholder="Add description..."
      />
    </div>
  );
};
