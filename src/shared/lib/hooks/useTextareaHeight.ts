import { SyntheticEvent, useCallback, useState } from "react";

export const useTextareaHeight = (initialTitle: string) => {
  const [title, setTitle] = useState(initialTitle);
  const [textareaHeight, setTextareaHeight] = useState(1);

  const handleTextareaChange = useCallback(
    (event: SyntheticEvent) => {
      const target = event.target as HTMLTextAreaElement;
      const height = target.scrollHeight;
      const rowHeight = 40;
      const trows = Math.ceil(height / rowHeight) - 1;

      const diff = trows - textareaHeight;

      if (diff) {
        console.log(trows - textareaHeight + " more rows");

        setTextareaHeight((prevValue) => prevValue + diff);
      }

      setTitle(target.value);
    },
    [textareaHeight]
  );

  return { textareaHeight, title, handleTextareaChange };
};
