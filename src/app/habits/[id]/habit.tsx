"use client";

import { Comments } from "@/features/Comments";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { TodoTitle } from "@/features/TodoTitle";
import { Description } from "@/features/Description";
import { TodoHeader } from "@/widgets/TodoHeader/ui/TodoHeader";

async function getData(id: string) {
  const res = await fetch(`/api/habits/${id}`);
  const data = await res.json();

  return data;
}

interface TaskPropType {
  id: string;
}

export default function Habit({ id }: TaskPropType) {
  const { data } = useQuery({
    queryKey: ["habit"],
    queryFn: () => getData(id),
  });

  //   const { tasks, userProjectNames } = data;
  //   const [activeFilter, setActiveFilter] = useState(FILTERS[0]);

  //   const handleFilterClick = (filter) => {
  //     setActiveFilter(filter);
  //   };

  const { title, style, description, comments, streak } = data;

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      {/* <TaskHeader style={style} progress={50} /> */}
      <TodoHeader style={style} progress={streak} todoType="habit" />

      <section className="flex flex-col grow">
        <TodoTitle initialTitle={title} todoType={"habit"} />

        {/* <div className="flex flex-wrap items-end gap-6 mt-6">
          <div className="flex gap-4">
            <ProjectInfo
              backgroundColor={parentProjectStyle.background}
              title={projectTitle}
              category={"Category"}
            />
          </div>

          <TaskDeadline style={style} deadline={deadline} />
        </div> */}

        <Description itemType="habit" initialValue="description" />

        <div className="mt-auto">
          <Comments comments={comments} itemType="habit" />
        </div>
      </section>
    </Layout>
  );
}
