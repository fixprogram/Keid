// import {
//   MutableRefObject,
//   SyntheticEvent,
//   useCallback,
//   useEffect,
//   useState,
// } from "react";

// export const useTextareaHeight = (
//   initialTitle: string,
//   textareaRef: MutableRefObject<HTMLTextAreaElement>,
//   rowHeight = 40
// ) => {
//   const [title, setTitle] = useState(initialTitle);
//   // const [textareaHeight, setTextareaHeight] = useState(1);

//   const handleTextareaChange = useCallback((event: SyntheticEvent) => {
//     const target = event.target as HTMLTextAreaElement;
//     setTitle(target.value);
//   }, []);

//   const resizeTextArea = useCallback(() => {
//     textareaRef.current.style.height = "auto";
//     textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";
//   }, [textareaRef]);

//   useEffect(() => {
//     resizeTextArea();
//   }, [resizeTextArea]);

//   // useEffect(() => {
//   //   if (textareaRef.current) {
//   //     const target = textareaRef.current as HTMLTextAreaElement;
//   //     const height = target.scrollHeight;
//   //     const trows = Math.round(height / rowHeight) - 1;

//   //     const diff = trows - textareaHeight;

//   //     console.log("textareaHeight: ", textareaHeight);

//   //     if (diff > 0) {
//   //       console.log("diff: ", diff);
//   //       setTextareaHeight(diff);
//   //       // setTextareaHeight(1 + diff);
//   //     }
//   //   }
//   // }, [textareaHeight, rowHeight, textareaRef]);

//   return { textareaHeight: 1, title, handleTextareaChange };
// };
