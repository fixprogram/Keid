import {
  MutableRefObject,
  SyntheticEvent,
  useCallback,
  useEffect,
  useState,
} from "react";

export const useTextareaHeight = (
  initialTitle: string,
  textareaRef: MutableRefObject<HTMLTextAreaElement | null>
) => {
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

  useEffect(() => {
    if (textareaRef.current) {
      const target = textareaRef.current as HTMLTextAreaElement;
      const height = target.scrollHeight;
      const rowHeight = 40;
      const trows = Math.ceil(height / rowHeight) - 1;

      const diff = trows - textareaHeight;

      if (diff) {
        setTextareaHeight(1 + diff);
      }
    }
  }, [textareaHeight]);

  return { textareaHeight, title, handleTextareaChange };
};
