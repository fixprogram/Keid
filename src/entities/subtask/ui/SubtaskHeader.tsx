// import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
// // import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
// import Icon from "@/shared/ui/Icon";
// import PopupLine from "@/shared/ui/PopupLine";
// import { useRouter } from "next/navigation";
// import { FC } from "react";
// // import { useCompleteSubtask } from "../../hooks/useCompleteSubtask";
// import { SUBTASK_SETTINGS } from "../config/consts";
// // import { openSettings } from "../../store/subtaskSlice";

// export const SubtaskHeader: FC = () => {
//   const router = useRouter();
//   // const dispatch = useAppDispatch();

//   const completeSubtaskHandler = useCompleteSubtask();

//   return (
//     <section className="flex items-center justify-between">
//       <button type="button" onClick={() => router.back()}>
//         <Icon name="back" height={27} width={27} />
//       </button>

//       <div className="flex gap-10">
//         <button type="button" onClick={completeSubtaskHandler}>
//           <Icon name="complete" height={14} width={19} />
//         </button>

//         {/* <button type="button" onClick={() => dispatch(openSettings())}>
//           <Icon name="settings" height={24} width={24} />
//         </button> */}

//         <PopupWithOverlay
//           positioned="Top"
//           btn={<Icon name="settings" height={24} width={24} />}
//         >
//           <PopupLine />

//           <b className="uppercase font-bold text-deactive text-xxs mt-4">
//             Subtask settings
//           </b>

//           <ul className="mt-6">
//             {SUBTASK_SETTINGS.map((setting, index) => (
//               <li
//                 key={setting.title}
//                 className={`border-b-[1px] border-white/5 flex items-center gap-5 ${
//                   index === 0 ? "pb-5" : "py-5"
//                 }`}
//                 onClick={setting.hook()}
//               >
//                 <Icon name={setting.iconName} width={16} height={16} />
//                 <b className={`text-lg font-bold ${setting.colorClass}`}>
//                   {setting.title}
//                 </b>
//               </li>
//             ))}
//           </ul>
//         </PopupWithOverlay>
//       </div>
//     </section>
//   );
// }
