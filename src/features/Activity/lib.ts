import { Comment } from "@prisma/client";

type LastWeekActiveTasks = {
  comments: Comment[];
  projectId: string;
  points: number;
}[];

export function getActivityDays(lastWeekActiveTasks: LastWeekActiveTasks) {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0); // Start of today

  const startOfWeek = new Date(today);
  startOfWeek.setDate(today.getDate() - (today.getUTCDay() || 7) + 1);

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

    const taskAmount = lastWeekActiveTasks
      .filter((task) =>
        task.comments.some((comment) => {
          return (
            Number(comment.time) > dayStart.getTime() &&
            Number(comment.time) <= nextDayStart.getTime()
          );
        })
      )
      .reduce((sum, task) => sum + task.points, 0);

    return { ...day, taskAmount };
  });

  return days;
}
