import { useCommentsStore } from "@/features/Comments/models/commentsStore";
import { useAddComment } from "@/features/Comments/models/useAddComment";
import AddButton from "@/shared/ui/AddButton";
import Overlay from "@/shared/ui/Overlay";
import Popup from "@/shared/ui/Popup";
import PopupLine from "@/shared/ui/PopupLine";
import {
  FC,
  Fragment,
  SyntheticEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { shallow } from "zustand/shallow";

interface AddCommentPopupPropsType {
  onSubmit: (comment: string) => void;
  isPopupOpened: boolean;
  onPopupClose: () => void;
}

export const AddCommentPopup: FC<AddCommentPopupPropsType> = ({
  onSubmit,
  isPopupOpened,
  onPopupClose,
}) => {
  const [comment, setComment] = useCommentsStore(
    (state) => [state.comment, state.setComment],
    shallow
  );

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const popupShowedStyles =
    isPopupOpened === false
      ? { bottom: 32 }
      : { bottom: 0, left: 0, right: 0, borderRadius: "24px 24px 0 0" };

  const handleFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(comment);
  };

  useEffect(() => {
    if (isPopupOpened && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [isPopupOpened]);

  return (
    <Fragment>
      <Popup
        isHidden={!isPopupOpened}
        popupStyle={{
          hidden: { bottom: -1000 },
          showed: { zIndex: 30, ...popupShowedStyles },
        }}
      >
        <PopupLine />

        <div className="p-6 relative">
          <form method="post" onSubmit={handleFormSubmit} className="flex">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="text-white grow ml-8 mr-16 font-sans font-medium text-sm"
              style={{ background: "inherit" }}
              placeholder="Post your comment..."
              ref={textareaRef}
            />

            <div className="absolute right-[20px] bottom-[26px]">
              <AddButton type="submit" />
            </div>
          </form>
        </div>
      </Popup>

      {isPopupOpened ? (
        <div className="absolute top-0 left-0" onClick={onPopupClose}>
          <Overlay />
        </div>
      ) : null}
    </Fragment>
  );
};
