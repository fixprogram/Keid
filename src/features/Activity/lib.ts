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
  ].map((day, idx, arr) => {
    // const today = new Date();
    const todayDate = new Date().getDate();
    const dayDate = new Date(
      new Date().setDate(todayDate - (arr.length - 1 - idx))
    ).getDate();
    // const dayDate = new Date(today.setDate(todayDate - day.weekDay)).getDate();

    const thisDay = new Date(new Date().setDate(dayDate)).setUTCHours(
      23,
      59,
      59,
      999
    );
    const prevDay = new Date(new Date().setDate(dayDate - 1)).setUTCHours(
      23,
      59,
      59,
      999
    );

    const taskAmount = lastWeekActiveTasks.filter((task) =>
      task.comments.find((comment) => {
        return +comment.time > prevDay && +comment.time <= thisDay;
      })
    ).length;

    return { ...day, taskAmount };
  });

  return days;
}
