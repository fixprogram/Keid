import { useNavigationStore } from "../../model/navigationStore";

type PopupAddState = "task" | "project";

const popupButtons = [
  {
    type: "task" as PopupAddState,
    name: "Create Task",
  },
  {
    type: "project" as PopupAddState,
    name: "Create Project",
  },
  {
    type: "habit" as PopupAddState,
    name: "Create Habit",
  },
];

export default function PopupIdle() {
  const setPopupAddState = useNavigationStore(
    (state) => state.setPopupAddState
  );

  return (
    <ul className="mt-2">
      {popupButtons.map((btn) => (
        <li
          key={btn.name}
          className="border-b-[1px] border-white/5 p-5 flex items-start justify-between"
          onClick={() => setPopupAddState(btn.type)}
        >
          <b className="text-lg text-white font-bold ml-9">{btn.name}</b>
        </li>
      ))}
    </ul>
  );
}
