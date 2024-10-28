import { isDateToday } from "@/shared/lib/utils/isDateToday";
import { Challenge, Comment, CommentType } from "@prisma/client";

export const hasCompletedToday = (comments: Comment[]) => {
  return Boolean(
    comments.filter(
      (comment) =>
        comment.type === CommentType.PROGRESS_UPDATE &&
        isDateToday(new Date(Number(comment.time)))
    ).length
  );
};
