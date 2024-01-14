import { usePopupStore } from "@/widgets/Navigation/model/usePopupStore";
import { FC } from "react";
import { shallow } from "zustand/shallow";

export const PopupRepeats: FC = () => {
  const [repeats, setRepeats] = usePopupStore(
    (state) => [state.repeats, state.setRepeats],
    shallow
  );

  return (
    <div className="flex gap-3 cursor-pointer">
      <div
        className={`rounded-full flex items-center justify-center w-12 h-12 `}
        style={{ backgroundColor: "#A5F59C" }}
      >
        <b>R</b>
      </div>
      <div>
        <p className="text-deactive font-medium text-sm">Repeats</p>
        <input
          type="number"
          value={repeats}
          onChange={(e) => setRepeats(Number(e.target.value))}
        />
      </div>
    </div>
  );
};
