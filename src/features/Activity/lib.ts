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
      // weekDay: 6,
    },
    {
      title: "T",
      // weekDay: 5,
    },
    {
      title: "W",
      // weekDay: 4,
    },
    {
      title: "T",
      // weekDay: 3,
    },
    {
      title: "F",
      // weekDay: 2,
    },
    {
      title: "S",
      // weekDay: 1,
    },
    {
      title: "S",
      // weekDay: 0,
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

  // console.log("lastWeekActiveTasks: ", lastWeekActiveTasks);

  return days;
}
