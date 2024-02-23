import { CompletedTask, InProgressTask, OverdueTask } from "@/entities/task";
import { EnhancedTask } from "@/server/actions";
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
  isCompleted?: boolean;
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
  isCompleted,
  // isCompleted,
}) => {
  const link = defaultLink ?? `/tasks/${id}`;
  // const isOverdue = deadline === 0 ? false : Date.now() > deadline;

  const formattedDeadline =
    withoutDeadline || deadline === null
      ? null
      : getDateString(new Date(deadline), false);

  if (isCompleted) {
    return <CompletedTask link={link} title={title} isStarred={isFavorite} />;
  }

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
