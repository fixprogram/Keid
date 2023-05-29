"use client";

import { ProjectHeader } from "@/entities/project";
import { ProjectScreenType } from "@/entities/project/config/consts";
import { useProjectStore } from "@/entities/project/models/projectStore";
import ProjectBody from "@/entities/project/ui/ProjectBody";
import Layout from "@/widgets/Layout";
import { ProjectOverview } from "@/widgets/ProjectOverview";
import { ProjectTasks } from "@/widgets/ProjectTasks";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useEffect } from "react";
import { shallow } from "zustand/shallow";

async function getData(id: string) {
  const res = await fetch(`/api/projects/${id}`);
  const data = await res.json();

  return data;
}

interface ProjectPropType {
  id: string;
}

const ComponentMap = {
  Overview: ProjectOverview,
  "Task List": ProjectTasks,
};

export default function Project({ id }: ProjectPropType) {
  const { data } = useQuery({
    queryKey: ["project"],
    queryFn: () => getData(id),
    // onSuccess(data) {
    //   setData(data);
    //   console.log("sucessss");
    // },
  });

  // console.log("!!!data: ", data);

  const [projectData, activeScreen, setData] = useProjectStore(
    (state) => [state.data, state.activeScreen, state.setData],
    shallow
  );

  useEffect(() => {
    if (data) {
      // console.log("setting data: ", data);
      setData(data);
    }
  }, [data, setData]);

  const { title, style, isStarred, tasks } = data;

  const Component = ComponentMap[activeScreen];

  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      {/* <ProjectHeader /> */}
      <ProjectHeader title={title} style={style} isStarred={isStarred} />

      {/* <ProjectBody /> */}
      {/* <ProjectBody screen="Task List" tasks={tasks} /> */}

      <Component initialTasks={tasks} />
    </Layout>
  );
}
