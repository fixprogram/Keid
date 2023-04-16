import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import { useUpdateProgress } from "./hooks/useUpdateProgress";
import { changeProgress, closePopup, openPopup } from "./store/progressSlice";

export default function UpdateProgress() {
  const dispatch = useAppDispatch();
  const popupOpened = useAppSelector((state) => state.progress.popupOpened);
  const progress = useAppSelector((state) => state.progress.progress);
  const handleUpdateProgress = useUpdateProgress();

  return (
    <div>
      <button
        type="button"
        className="text-white"
        onClick={() => dispatch(openPopup())}
      >
        Update
      </button>

      <Popup
        isHidden={!popupOpened}
        popupStyle={{
          hidden: { top: "-1000px" },
          showed: { top: "80px", zIndex: 20 },
        }}
      >
        <div>
          <b className="block text-white">Update progress</b>
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(event) => dispatch(changeProgress(+event.target.value))}
          />

          <div className="mt-4">
            <PrimaryButton text="Update" onClick={handleUpdateProgress} />
          </div>
        </div>
      </Popup>
      {popupOpened ? (
        <div onClick={() => dispatch(closePopup())}>
          <Overlay />
        </div>
      ) : null}
    </div>
  );
}
