// // import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// // import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
// import Overlay from "@/shared/ui/Overlay";
// import Popup from "@/shared/ui/Popup";
// import PopupLine from "@/shared/ui/PopupLine";
// import { Fragment } from "react";
// import AddSubtaskPopupBody from "./components/AddSubtaskPopupBody";
// import { closePopup } from "./store/addSubtaskSlice";

// export default function AddSubtaskPopup() {
//   // const dispatch = useAppDispatch();
//   // const isAddSubtaskPopupOpened = useAppSelector(
//   //   (state) => state.addSubtask.isAddSubtaskPopupOpened
//   // );
//   // const popupShowedStyles =
//   //   isAddSubtaskPopupOpened === false
//   //     ? { bottom: 32 }
//   //     : { bottom: 0, left: 0, right: 0, borderRadius: "24px 24px 0 0" };

//   return (
//     <Fragment>
//       23
//       {/* <Popup
//         isHidden={!isAddSubtaskPopupOpened}
//         popupStyle={{
//           hidden: { bottom: -1000 },
//           showed: { zIndex: 30, ...popupShowedStyles },
//         }}
//       >
//         <PopupLine />

//         <AddSubtaskPopupBody />
//       </Popup>

//       {isAddSubtaskPopupOpened ? (
//         <div
//           className="absolute top-0 left-0"
//           onClick={() => dispatch(closePopup())}
//         >
//           <Overlay />
//         </div>
//       ) : null} */}
//     </Fragment>
//   );
// }
