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

export type TaskCardType = Omit<Task, "projectId"> & {
  isFavorite?: boolean;
  projectTitle?: string;
  defaultLink?: string;
  withoutDeadline?: boolean;
  subtasks?: Task[];
  parentOpened?: boolean;
};

export const TaskCard: FC<TaskCardType> = ({
  defaultLink,
  id,
  title,
  deadline,
  style,
  progress,
  completed,
  repeats,
  comments,
  isFavorite = false,
  projectTitle,
  subtaskIds,
  withoutDeadline = false,
  subtasks = [],
  parentOpened = false,
}) => {
  const link = defaultLink ?? `/tasks/${id}`;
  const isCompleted = Boolean(completed);
  // const isOverdue = deadline === 0 ? false : Date.now() > deadline;
  // const isRepeated = repeats !== "Once";
  const isExpired = completed > deadline;

  const formattedDeadline =
    withoutDeadline || deadline === 0
      ? null
      : getDateString(new Date(deadline), false);
  const formattedCompleted =
    withoutDeadline || deadline === 0
      ? null
      : getDateString(new Date(completed), false);

  if (isCompleted) {
    return (
      <CompletedTask
        link={link}
        title={title}
        isExpired={isExpired}
        completed={formattedCompleted}
        isStarred={isFavorite}
      />
    );
  }

  // if (isRepeated) {
  //   const daysToRepeat = getDifferenceBetweenDates(+comments[0].time, deadline);
  //   return (
  //     <RepeatedTask
  //       link={link}
  //       title={title}
  //       deadline={formattedDeadline}
  //       style={style}
  //       progress={progress}
  //       daysToRepeat={daysToRepeat}
  //       isStarred={isFavorite}
  //     />
  //   );
  // }

  // if (isOverdue) {
  //   return (
  //     <OverdueTask
  //       link={link}
  //       title={title}
  //       deadline={formattedDeadline}
  //       style={style}
  //       progress={progress}
  //       isStarred={isFavorite}
  //       projectTitle={projectTitle}
  //       subtasks={subtasks}
  //     />
  //   );
  // }

  return (
    <InProgressTask
      id={id}
      link={link}
      title={title}
      deadline={formattedDeadline}
      style={style}
      progress={progress}
      isStarred={isFavorite}
      projectTitle={projectTitle}
      subtasks={subtasks}
      parentOpened={parentOpened}
    />
  );
};
