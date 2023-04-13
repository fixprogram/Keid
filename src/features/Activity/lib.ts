import { getWeekDayTimestamp } from "@/shared/lib/utils/getWeekDay";
import { Comment } from "@prisma/client";

type LastWeekActiveTasks = {
  comments: Comment[];
  projectId: string;
}[];

export function getActivityDays(lastWeekActiveTasks: LastWeekActiveTasks) {
  const days = [
    {
      title: "M",
    },
    {
      title: "T",
    },
    {
      title: "W",
    },
    {
      title: "T",
    },
    {
      title: "F",
    },
    {
      title: "S",
    },
    {
      title: "S",
    },
  ].map((day, idx) => {
    const prevDayTimestamp = getWeekDayTimestamp(new Date(), idx + 1);
    const thisDayTimestamp = getWeekDayTimestamp(new Date(), idx + 2);

    const taskAmount = lastWeekActiveTasks.filter((task) =>
      task.comments.find(
        (comment) =>
          +comment.time > prevDayTimestamp && +comment.time < thisDayTimestamp
      )
    ).length;

    return { ...day, taskAmount };
  });

  return days;
}
