import { useDispatch } from "react-redux";
import { openPopup } from "../../../AddSubtaskPopup/store/addSubtaskSlice";

export default function SubtaskList() {
  const dispatch = useDispatch();

  return (
    <div className="mt-6">
      <b className="text-white">Subtask list</b>
      <button type="button" onClick={() => dispatch(openPopup())}>
        Add subtask
      </button>
    </div>
  );
}
