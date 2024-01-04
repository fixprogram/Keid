import {
  useState,
  useCallback,
  SyntheticEvent,
  useEffect,
  MutableRefObject,
} from "react";

export const useAutosizeTextarea = (
  initialValue: string,
  ref: MutableRefObject<HTMLTextAreaElement>
) => {
  const [value, setValue] = useState(initialValue);

  const resizeTextArea = useCallback(() => {
    ref.current.style.height = "42px";
    ref.current.style.height = ref.current.scrollHeight + "px";
  }, [ref]);

  const handleValueChange = useCallback((event: SyntheticEvent) => {
    const target = event.target as HTMLTextAreaElement;
    setValue(target.value);
  }, []);

  useEffect(() => {
    resizeTextArea();
  }, [value, resizeTextArea]);

  return { value, handleValueChange };
};
