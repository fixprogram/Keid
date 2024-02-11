"use client";

import { ProjectHeader } from "@/entities/project";
import { useProjectStore } from "@/entities/project/models/projectStore";
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

interface ProjectPropsType {
  id: string;
}

const ComponentMap = {
  Overview: ProjectOverview,
  "Task List": ProjectTasks,
};

export default function Project({ id }: ProjectPropsType) {
  const { data } = useQuery({
    queryKey: ["project"],
    queryFn: () => getData(id),
  });

  const [projectData, activeScreen, setData] = useProjectStore(
    (state) => [state.data, state.activeScreen, state.setData],
    shallow
  );

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  const { title, style, isStarred, tasks } = data;

  const Component = ComponentMap[activeScreen];

  return (
    <Layout isBottomGradientShowed={false}>
      <ProjectHeader title={title} style={style} isStarred={isStarred} />

      <Component initialTasks={tasks} {...data} />
    </Layout>
  );
}
