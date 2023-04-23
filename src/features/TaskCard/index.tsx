import {
  CompletedTask,
  InProgressTask,
  OverdueTask,
  RepeatedTask,
} from "@/entities/task";
import { getDateString } from "@/shared/lib/utils/getDateString";
import { getDifferenceBetweenDates } from "@/shared/lib/utils/getDifferenceBetweenDates";
import { Task } from "@prisma/client";
import { FC } from "react";

type TaskCardProps = Pick<
  Task,
  "title" | "style" | "progress" | "repeats" | "comments"
> & {
  link: string;
  deadline: number;
  completed: string;
  daysToRepeat?: number;
};

export const TaskCard: FC<TaskCardProps> = ({
  link,
  title,
  deadline,
  style,
  progress,
  completed,
  repeats,
  comments,
}) => {
  const isCompleted = Boolean(completed);
  const isOverdue = deadline && Date.now() > new Date(deadline).getTime();
  const isRepeated = repeats !== "Once";

  const formattedDeadline =
    deadline === 0 ? null : getDateString(new Date(deadline), false);

  if (isCompleted) {
    return <CompletedTask link={link} title={title} completed={completed} />;
  }

  if (isRepeated) {
    const daysToRepeat = getDifferenceBetweenDates(+comments[0].time, deadline);
    return (
      <RepeatedTask
        link={link}
        title={title}
        deadline={formattedDeadline}
        style={style}
        progress={progress}
        daysToRepeat={daysToRepeat}
      />
    );
  }

  if (isOverdue) {
    return (
      <OverdueTask
        link={link}
        title={title}
        deadline={formattedDeadline}
        style={style}
        progress={progress}
      />
    );
  }

  return (
    <InProgressTask
      link={link}
      title={title}
      deadline={formattedDeadline}
      style={style}
      progress={progress}
    />
  );
};
