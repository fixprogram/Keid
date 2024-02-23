import { CommentType } from "@/widgets/Comments/config/types";
import { FC } from "react";
import { Comment } from "./ui/Comment";

interface CommentListProps {
  comments: CommentType[];
  onDelete: (time: string) => void;
}

export const CommentList: FC<CommentListProps> = ({ comments, onDelete }) => {
  return (
    <ul className="mt-6 flex flex-col gap-6">
      {comments.map((comment) => (
        <Comment key={comment.time} onDelete={onDelete} {...comment} />
      ))}
    </ul>
  );
};
