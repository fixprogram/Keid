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
  "title" | "style" | "progress" | "repeats" | "comments" | "subtaskIds"
> & {
  link: string;
  deadline: number;
  completed: number;
  daysToRepeat?: number;
  isFavourite: boolean;
  projectTitle?: string;
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
  isFavourite,
  projectTitle,
  subtaskIds,
}) => {
  const isCompleted = Boolean(completed);
  const isOverdue = deadline === 0 ? false : Date.now() > deadline;
  const isRepeated = repeats !== "Once";

  const formattedDeadline =
    deadline === 0 ? null : getDateString(new Date(deadline), false);
  const formattedCompleted = getDateString(new Date(completed), false);

  if (isCompleted) {
    return (
      <CompletedTask
        link={link}
        title={title}
        isExpired={completed > deadline}
        completed={formattedCompleted}
        isStarred={isFavourite}
      />
    );
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
        isStarred={isFavourite}
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
        isStarred={isFavourite}
        projectTitle={projectTitle}
        subtasksTotal={subtaskIds.length}
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
      isStarred={isFavourite}
      projectTitle={projectTitle}
      subtasksTotal={subtaskIds.length}
    />
  );
};
