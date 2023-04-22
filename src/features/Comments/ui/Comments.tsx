// import { CommentType } from "@/application/types/comment";
import { FC, useState } from "react";
import { CommentType } from "../models/types";
import { AddCommentPopup } from "./ui/AddCommentPopup";
import { CommentList } from "./ui/CommentList";

interface CommentsPropsType {
  comments: CommentType[];
  onSubmit: (comment: string) => null | undefined;
  onDelete: (time: string) => void;
}

export const Comments: FC<CommentsPropsType> = ({
  comments,
  onSubmit,
  onDelete,
}) => {
  const [isPopupOpened, setPopupOpened] = useState(false);
  return (
    <>
      <CommentList comments={comments} onDelete={onDelete} />

      <div className="flex mt-auto p-9 pb-3 placeholder:text-white">
        <input
          type="text"
          placeholder="Post your comment..."
          onClick={(e) => {
            const target = e.target as HTMLTextAreaElement;
            target.blur();
            setPopupOpened(true);
          }}
          className="ml-8 placeholder:text-white font-sans font-medium text-sm"
          style={{ background: "inherit" }}
          autoComplete="off"
        />
      </div>

      <AddCommentPopup
        onSubmit={onSubmit}
        isPopupOpened={isPopupOpened}
        onPopupClose={() => setPopupOpened(false)}
      />
    </>
  );
};
