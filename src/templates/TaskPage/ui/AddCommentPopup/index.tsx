import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import AddButton from "@/shared/ui/AddButton";
import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import PopupLine from "@/shared/ui/PopupLine";
import { Fragment } from "react";
import { useCommentFormSubmit } from "../../hooks/useCommentFormSubmit";
import { closeAddComment, setCommentContent } from "../../store/taskSlice";

export default function AddCommentPopup() {
  const dispatch = useAppDispatch();
  const addCommentOpened = useAppSelector(
    (state) => state.task.addCommentOpened
  );
  const content = useAppSelector((state) => state.task.commentContent);
  const popupShowedStyles =
    addCommentOpened === false
      ? { bottom: 32 }
      : { bottom: 0, left: 0, right: 0, borderRadius: "24px 24px 0 0" };

  const handleFormSubmit = useCommentFormSubmit();

  return (
    <Fragment>
      <Popup
        isHidden={!addCommentOpened}
        popupStyle={{
          hidden: { bottom: -1000 },
          showed: { zIndex: 30, ...popupShowedStyles },
        }}
      >
        <PopupLine />

        <div className="p-6 relative">
          <form method="post" onSubmit={handleFormSubmit}>
            <textarea
              value={content}
              onChange={(e) => dispatch(setCommentContent(e.target.value))}
              className="text-white"
              style={{ background: "inherit" }}
              placeholder="Add comment..."
            />

            <div className="absolute right-[20px] bottom-[26px]">
              <AddButton type="submit" />
            </div>
          </form>
        </div>
      </Popup>

      {addCommentOpened ? (
        <div
          className="absolute top-0 left-0"
          onClick={() => dispatch(closeAddComment())}
        >
          <Overlay />
        </div>
      ) : null}
    </Fragment>
  );
}
