import { Challenge, CommentType, Habit } from "@prisma/client";
import { hasCompletedToday } from "./hasCompletedToday";

// Разделяем список на завершенные и незавершенные задачи
// Сортируем список с завершенными задачами по дате завершения
// Соединяем оба списка вместе
export const sortCompletedToday = (entities: Habit[] | Challenge[]) => {
  const completedToday = entities.filter((item) =>
    hasCompletedToday(item.comments)
  );
  const uncompletedToday = entities.filter(
    (item) => !hasCompletedToday(item.comments)
  );

  const sortedCompleted = completedToday.sort((a, b) => {
    const lastAUpdate = Number(
      a.comments
        .filter((comment) => comment.type === CommentType.PROGRESS_UPDATE)
        .at(-1)?.time
    );

    const lastBUpdate = Number(
      b.comments
        .filter((comment) => comment.type === CommentType.PROGRESS_UPDATE)
        .at(-1)?.time
    );

    return lastBUpdate - lastAUpdate;
  });

  return [...uncompletedToday, ...sortedCompleted];
};
