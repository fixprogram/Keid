"use client";

import { Comments } from "@/features/Comments";
import { ProjectInfo } from "@/entities/project";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useTaskStore } from "@/entities/task/models/taskStore";
import { TaskHeader } from "@/widgets/TaskHeader";
import { TodoTitle } from "@/features/TodoTitle";
import Link from "next/link";
import { Description } from "@/features/Description";
import { SubtaskList } from "@/features/SubtaskList/ui/SubtaskList";
import { TodoDeadline } from "@/features/TodoDeadline";

async function getData(id: string) {
  const res = await fetch(`/api/tasks/${id}`);
  const data = await res.json();

  return data;
}

interface TaskPropType {
  id: string;
}

export default function Task({ id }: TaskPropType) {
  const { data } = useQuery({
    queryKey: ["task", id],
    queryFn: () => getData(id),
  });

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
  } = data;

  const parentProjectStyle = projectStyles[projectStyle as ProjectStyleKey];

  const setTaskData = useTaskStore((state) => state.setTaskData);

  useEffect(() => {
    setTaskData(data);
  }, [data, setTaskData]);

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <TaskHeader style={style} progress={progress} />

      <section className="flex flex-col grow">
        <TodoTitle initialTitle={title} todoType="task" />

        <div className="flex flex-wrap items-end gap-6 mt-6">
          <Link href={`/projects/${projectId}`} className="flex gap-4">
            <ProjectInfo
              projectStyle={parentProjectStyle}
              title={projectTitle}
              category={"Category"}
              isStarred={false}
            />
          </Link>

          <TodoDeadline style={style} deadline={deadline} todoType="task" />
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
