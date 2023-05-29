"use client";

import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useTaskStore } from "@/entities/task/models/taskStore";
import { SubtaskHeader } from "@/widgets/SubtaskHeader";
import { ProjectStyleKey, projectStyles } from "@/shared/config/projectStyles";
import { getDateString } from "@/shared/lib/utils/getDateString";
import DueDate from "@/features/DueDate";
import { Comments } from "@/features/Comments";
import { Description } from "@/features/Description";
import { TodoTitle } from "@/features/TodoTitle";

async function getData(id: string) {
  const res = await fetch(`/api/subtasks/${id}`);
  const data = await res.json();

  return data;
}

interface SubtaskPropsType {
  id: string;
}

export default function Subtask({ id }: SubtaskPropsType) {
  const { data } = useQuery({
    queryKey: ["subtask", id],
    queryFn: () => getData(id),
  });
  // const setTaskData = useTaskStore((state) => state.setTaskData);

  const {
    style,
    progress,
    title,
    parentTitle,
    deadline,
    comments,
    description,
  } = data;

  const subtaskStyle = projectStyles[style as ProjectStyleKey];

  // useEffect(() => {
  //   setTaskData(data);
  // }, [data, setTaskData]);

  //   if (deadline === 0) {
  //       return null;
  //     }

  const formattedDeadline = getDateString(new Date(deadline), false);

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <SubtaskHeader style={style} progress={progress} />

      <section className="flex flex-col grow">
        <b
          className="mt-8 font-semibold font-lg block"
          style={{ color: subtaskStyle.background }}
        >
          {parentTitle}
        </b>

        {/* <h2 className="text-xxl text-poppins text-white mt-2 font-semibold">
          {title}
        </h2> */}

        <TodoTitle initialTitle={title} todoType="subtask" />

        {/* <SubtaskTitle initialTitle={title} /> */}

        {deadline ? (
          <div className="flex flex-wrap items-end gap-6 mt-6">
            <DueDate
              date={formattedDeadline}
              dateColor={subtaskStyle.background}
              circleColor={"#246BFD"}
              //   onClick={handleOpenCalendar}
            />
          </div>
        ) : null}
        {/* <SubtaskDeadline /> */}

        <Description itemType="subtask" initialValue={description} />

        <div className="mt-auto">
          <Comments comments={comments} itemType={"subtask"} />
        </div>
      </section>
    </Layout>
  );
}
