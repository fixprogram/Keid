import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { setPopupAddState } from "../../../../store/navigationSlice";

const popupButtons = [
  {
    type: "task",
    name: "Create Task",
  },
  {
    type: "project",
    name: "Create Project",
  },
];

export default function PopupIdle() {
  const dispatch = useAppDispatch();

  return (
    <ul className="mt-2">
      {popupButtons.map((btn) => (
        <li
          key={btn.name}
          className="border-b-[1px] border-white/5 p-5 flex items-start justify-between"
          onClick={() => dispatch(setPopupAddState(btn.type))}
        >
          <b className="text-lg text-white font-bold ml-9">{btn.name}</b>
        </li>
      ))}
    </ul>
  );
}
