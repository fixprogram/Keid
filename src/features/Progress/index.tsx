// import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
// // import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// // import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import PrimaryButton from "@/shared/ui/PrimaryButton";
// import { useUpdateProgress } from "./hooks/useUpdateProgress";
// import {
//   changeComment,
//   changeProgress,
//   closePopup,
//   openPopup,
// } from "./store/progressSlice";

// export default function UpdateProgress() {
//   // const dispatch = useAppDispatch();
//   // const popupOpened = useAppSelector((state) => state.progress.popupOpened);
//   // const progress = useAppSelector((state) => state.progress.progress);
//   // const comment = useAppSelector((state) => state.progress.comment);
//   const handleUpdateProgress = useUpdateProgress();
//   const handlePopupClose = () => dispatch(closePopup());

//   return (
//     <div>
//       <button
//         type="button"
//         className="text-white"
//         onClick={() => dispatch(openPopup())}
//       >
//         Update
//       </button>

//       <PopupWithOverlay
//         isShowed={popupOpened}
//         positioned="Top"
//         onClose={handlePopupClose}
//       >
//         <div className="p-5">
//           <b className="block text-white">Update progress</b>
//           <input
//             type="range"
//             min={0}
//             max={100}
//             value={progress}
//             onChange={(event) => dispatch(changeProgress(+event.target.value))}
//             className="w-full mt-4"
//           />

//           <textarea
//             value={comment}
//             onChange={(event) => dispatch(changeComment(event.target.value))}
//             placeholder="Leave a comment..."
//             className="text-white mt-4 w-full"
//             style={{ background: "inherit" }}
//           />

//           <div className="mt-4">
//             <PrimaryButton text="Update" onClick={handleUpdateProgress} />
//           </div>
//         </div>
//       </PopupWithOverlay>
//     </div>
//   );
// }
