import { isDateToday } from "@/shared/lib/utils/isDateToday";
import { Challenge, CommentType, Habit } from "@prisma/client";

export const hasCompletedToday = (entity: Challenge | Habit) => {
  return Boolean(
    entity.comments.filter(
      (entity) =>
        entity.type === CommentType.PROGRESS_UPDATE &&
        isDateToday(new Date(Number(entity.time)))
    ).length
  );
};
