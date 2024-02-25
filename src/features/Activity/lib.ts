import { getStartOfWeek } from "@/shared/lib/utils/getStartOfWeek";
import { Comment, CommentType, Task } from "@prisma/client";

export type Day = {
  // Название дня недели (M, T, W...)
  title: string;
  // Всего поинтов заработано за день
  totalPoints: number;
  // Массив идентификаторов запланированных на день задач
  plannedTasks: string[];
  // Массив идентификаторов выполненных за день задач
  completedTasks: string[];
  plannedHabits: string[];
  completedHabits: string[];
  taskPoints: number;
  habitPoints: number;
};

type LastWeekPlannedTasks = {
  id: string;
  comments: Comment[];
  points: number;
  deadline: Date | null;
}[];

type LastWeekPlannedHabits = {
  id: string;
  comments: Comment[];
  points: number;
}[];

type LastWeekPlannedChallenges = {
  comments: Comment[];
  points: number;
}[];

export function getActivityDays(
  lastWeekPlannedTasks: LastWeekPlannedTasks,
  // lastWeekCompletedTasks: LastWeekCompletedTasks,
  lastWeekPlannedHabits: LastWeekPlannedHabits,
  // lastWeekCompletedHabits: LastWeekCompletedHabits,
  lastWeekActiveChallenges: LastWeekPlannedChallenges
): Day[] {
  const startOfWeek = getStartOfWeek();

  const days = [
    { title: "M" },
    { title: "T" },
    { title: "W" },
    { title: "T" },
    { title: "F" },
    { title: "S" },
    { title: "S" },
  ].map((day, index) => {
    // Calculate the start of each day
    const dayStart = new Date(startOfWeek);
    dayStart.setDate(dayStart.getDate() + index);

    // Calculate the start of the next day
    const nextDayStart = new Date(dayStart);
    nextDayStart.setDate(dayStart.getDate() + 1);

    const startTimestamp = dayStart.getTime();
    const endTimestamp = nextDayStart.getTime();

    const plannedTasks = lastWeekPlannedTasks.filter(
      (task) =>
        task.deadline &&
        task.deadline > new Date(startTimestamp) &&
        task.deadline <= new Date(endTimestamp)
    );
    const completedTasks = plannedTasks.filter((task) =>
      task.comments.some((comment) => {
        return (
          comment.type === CommentType.COMPLETED &&
          Number(comment.time) > startTimestamp &&
          Number(comment.time) <= endTimestamp
        );
      })
    );
    const taskPoints = plannedTasks.reduce((sum, task) => sum + task.points, 0);

    const plannedHabits = lastWeekPlannedHabits.filter((habit) =>
      habit.comments.some((comment) => {
        return (
          comment.type === CommentType.STARTED &&
          Number(comment.time) <= endTimestamp
        );
      })
    );
    const completedHabits = plannedHabits.filter((habit) =>
      habit.comments.some((comment) => {
        return (
          comment.type === CommentType.PROGRESS_UPDATE &&
          Number(comment.time) > startTimestamp &&
          Number(comment.time) <= endTimestamp
        );
      })
    );
    const habitPoints = plannedHabits.reduce(
      (sum, habit) => sum + habit.points,
      0
    );

    return {
      ...day,
      plannedTasks: plannedTasks.map((item) => item.id),
      completedTasks: completedTasks.map((item) => item.id),
      plannedHabits: plannedHabits.map((item) => item.id),
      completedHabits: completedHabits.map((item) => item.id),
      totalPoints: taskPoints + habitPoints,
      taskPoints,
      habitPoints,
    };
  });

  return days;
}
