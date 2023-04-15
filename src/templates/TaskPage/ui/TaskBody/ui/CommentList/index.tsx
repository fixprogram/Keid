import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Comment from "./components/Comment";

export default function CommentList() {
  const comments = useAppSelector((state) => state.task.comments);

  return (
    <ul className="mt-6 flex flex-col gap-6">
      {comments.map((comment) => (
        <Comment key={comment.time} {...comment} />
      ))}
    </ul>
  );
}
