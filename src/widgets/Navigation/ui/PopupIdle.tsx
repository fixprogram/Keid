import { PopupAddState, useNavigationStore } from "../model/useNavigationStore";

const popupButtons = [
  {
    type: PopupAddState.task,
    name: "Create Task",
  },
  {
    type: PopupAddState.project,
    name: "Create Project",
  },
  {
    type: PopupAddState.habit,
    name: "Create Habit",
  },
  {
    type: PopupAddState.challenge,
    name: "Create Challenge",
  },
];

export default function PopupIdle() {
  const setPopupAddState = useNavigationStore(
    (state) => state.setPopupAddState
  );

  return (
    <ul className="mt-2">
      {popupButtons.map((btn, index, array) => (
        <li
          key={btn.name}
          className={`${
            index < array.length - 1 ? "border-b" : ""
          } border-white/5 p-5 flex items-start justify-between`}
          onClick={() => setPopupAddState(btn.type)}
        >
          <b className="text-lg text-white font-bold ml-9">{btn.name}</b>
        </li>
      ))}
    </ul>
  );
}
