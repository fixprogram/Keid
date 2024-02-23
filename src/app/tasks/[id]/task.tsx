"use client";

import { Comments } from "@/widgets/Comments";
import { ProjectInfo } from "@/entities/project";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import { TaskHeader } from "@/widgets/TaskHeader";
import { TodoTitle } from "@/features/TodoTitle";
import Link from "next/link";
import { Description } from "@/features/Description";
import { SubtaskList } from "@/features/SubtaskList/ui/SubtaskList";
import { TodoDeadline } from "@/features/TodoDeadline";
import Loading from "@/app/loading";
import { Task as TaskType } from "@prisma/client";
import { CommentType } from "@/widgets/Comments/config/types";
import { TodoPoints } from "@/features/TodoPoints";

type DataType = Omit<TaskType, "comments"> & {
  subtasks: TaskType[];
  projectStyle: string;
  projectTitle: string;
  parentTitle: string;
  comments: CommentType[];
};

async function getData(id: string) {
  const res = await fetch(`/api/tasks/${id}`);
  const data = await res.json();

  return data;
}

interface TaskPropType {
  id: string;
}

export default function Task({ id }: TaskPropType) {
  const { data, isLoading } = useQuery<DataType>({
    queryKey: ["task", id],
    queryFn: () => getData(id),
  });

  if (isLoading || !data) {
    return <Loading />;
  }

  const {
    title,
    style,
    deadline,
    projectStyle,
    projectTitle,
    projectId,
    comments,
    progress,
    subtasks,
    description,
    parentTitle,
    parentId,
    points,
  } = data;

  const parentProjectStyle = projectStyles[projectStyle as ProjectStyleKey];

  const parentLink =
    parentId === projectId ? `/projects/${parentId}` : `/tasks/${parentId}`;

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <TaskHeader style={style} progress={progress} />

      <section className="flex flex-col grow">
        <Link
          href={parentLink}
          className="mt-8 font-bold font-lg block"
          style={{ color: parentProjectStyle.background }}
        >
          {parentTitle}
        </Link>

        <div className="mt-2">
          <TodoTitle initialTitle={title} todoType="task" />
        </div>

        <div className="flex flex-wrap items-end gap-6 mt-6">
          <TodoPoints initialPoints={points} todoType="task" />

          {deadline ? (
            <TodoDeadline style={style} deadline={deadline} todoType="task" />
          ) : null}
        </div>

        <Description itemType="task" initialValue={description} />

        <SubtaskList subtasks={subtasks} taskStyle={style} />

        <div className="mt-auto">
          <Comments comments={comments} itemType={"task"} />
        </div>
      </section>

      {/* <AddSubtaskPopup /> */}

      {/* <TaskCalendar /> */}
    </Layout>
  );
}
