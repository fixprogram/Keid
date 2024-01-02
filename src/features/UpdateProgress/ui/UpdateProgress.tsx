import { PopupWithOverlay } from "@/shared/components/PopupWithOverlay";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import { ItemType } from "@/shared/config/types";
import Icon from "@/shared/ui/Icon";
import PrimaryButton from "@/shared/ui/PrimaryButton";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import { FC, useState } from "react";
import { useUpdateProgress } from "../model/useUpdateProgress";

interface UpdateProgressPropsType {
  style: string;
  initialProgress: number;
  itemType: ItemType;
}

export const UpdateProgress: FC<UpdateProgressPropsType> = ({
  style,
  initialProgress,
  itemType,
}) => {
  //   const initialProgress = useTaskStore((state) => state.data.progress);
  const [progress, setProgress] = useState(initialProgress);
  const [comment, setComment] = useState("");

  const handleUpdateProgress = useUpdateProgress(itemType);

  const taskStyle = projectStyles[style as ProjectStyleKey];

  if (initialProgress === 100) {
    return (
      <div className="min-w-[40px]">
        <Icon name="completed" width={40} height={40} />
      </div>
    );
  }

  return (
    <PopupWithOverlay
      // isShowed={popupOpened}
      positioned="Top"
      // onClose={handlePopupClose}
      btn={
        <RoundProgressBar
          id={"taskProgress"}
          progress={progress}
          stopColors={taskStyle.progressGradient}
          isOnPage={true}
        />
      }
      //   btn={<span className="text-white">Update</span>}
    >
      <div className="p-5">
        <b className="block text-white">Update progress</b>
        {itemType === "habit" || itemType === "challenge" ? (
          <div className="flex gap-3">
            <input
              type="number"
              min={0}
              max={100}
              value={progress}
              // onChange={(event) => setProgress(+event.target.value)}
              className="w-full mt-4"
              readOnly
            />
            <button
              onClick={() => setProgress(progress + 1)}
              className="p-4 text-xxl text-white"
            >
              +
            </button>
            <button
              onClick={() => setProgress(progress - 1)}
              className="p-4 text-xxl text-white"
            >
              -
            </button>
          </div>
        ) : (
          <input
            type="range"
            min={0}
            max={100}
            value={progress}
            onChange={(event) => setProgress(+event.target.value)}
            className="w-full mt-4"
          />
        )}

        <textarea
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          placeholder="Leave a comment..."
          className="text-white mt-4 w-full"
          style={{ background: "inherit" }}
        />

        <div className="mt-4">
          <PrimaryButton
            type="button"
            text="Update"
            onClick={() => handleUpdateProgress(progress, comment)}
          />
        </div>
      </div>
    </PopupWithOverlay>
  );
};
