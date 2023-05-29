// // import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// // import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import { SyntheticEvent, useCallback } from "react";
// import { setTitle } from "../../store/addSubtaskSlice";

// export default function InputSubtaskTitle() {
//   // const dispatch = useAppDispatch();
//   // const title = useAppSelector((state) => state.addSubtask.title);

//   // const handleSubtaskTitleChange = useCallback(
//   //   (event: SyntheticEvent) => {
//   //     const target = event.target as HTMLInputElement;
//   //     return dispatch(setTitle(target.value));
//   //   },
//   //   [dispatch]
//   // );

//   return (
//     <div className="flex items-end mt-4">
//       <input
//         type="text"
//         name="name"
//         placeholder="Subtask Name..."
//         className="block text-lg text-white font-semibold pt-3 border-none border-b border-b-background2 placeholder:text-deactive"
//         style={{ background: "inherit" }}
//         // value={title}
//         // onChange={handleSubtaskTitleChange}
//         autoComplete="off"
//       />

//       {/* <p>{error}</p> */}
//     </div>
//   );
// }
