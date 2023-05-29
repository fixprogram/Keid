import { FC } from "react";
import { shallow } from "zustand/shallow";
import { useCommentsStore } from "../models/commentsStore";
import { CommentType } from "../config/types";
import { useAddComment } from "../models/useAddComment";
import { useDeleteComment } from "../models/useDeleteComment";
import { AddCommentPopup } from "./ui/AddCommentPopup";
import { CommentList } from "./ui/CommentList";
import { ItemType } from "@/shared/config/types";

interface CommentsPropsType {
  comments: CommentType[];
  itemType: ItemType;
}

export const Comments: FC<CommentsPropsType> = ({ comments, itemType }) => {
  const [isPopupOpened, setPopupOpened, reset] = useCommentsStore(
    (state) => [state.isPopupOpened, state.setPopupOpened, state.reset],
    shallow
  );

  const handleAddComment = useAddComment(itemType);
  const handleDeleteComment = useDeleteComment(itemType);

  return (
    <>
      <CommentList comments={comments} onDelete={handleDeleteComment} />

      <div className="flex mt-auto p-9 pb-3 placeholder:text-white">
        <input
          type="text"
          placeholder="Post your comment..."
          onClick={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.blur();
            setPopupOpened();
          }}
          className="ml-8 placeholder:text-white font-sans font-medium text-sm"
          style={{ background: "inherit" }}
          autoComplete="off"
        />
      </div>

      <AddCommentPopup
        onSubmit={handleAddComment}
        isPopupOpened={isPopupOpened}
        onPopupClose={reset}
      />
    </>
  );
};
