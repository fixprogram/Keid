import { isDateToday } from "@/shared/lib/utils/isDateToday";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { Challenge, CommentType, Habit, Member } from "@prisma/client";

// TODO: Move lower in architecture
export const getIsCompletedForToday = (
  entity: Challenge | Habit,
  userId?: string
) => {
  return Boolean(
    entity.comments.filter(
      (entity) =>
        entity.type === CommentType.PROGRESS_UPDATE &&
        isDateToday(new Date(Number(entity.time)))
    ).length
  );
};
