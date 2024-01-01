"use client";

import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { List } from "@/shared/ui/List";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import { useTasksStore } from "@/entities/task/models/tasksStore";
import { TASK_FILTERS, TaskFilterType } from "@/entities/task/config/consts";
import { Task } from "@prisma/client";

const defaultData = {
  tasks: [],
  userProjectNames: [],
};

type TaskType = Task & { isFavorite: boolean; projectTitle: string };

export type OverdueTasksDataType = {
  tasks: TaskType[];
  userProjectNames: [];
};

async function getData() {
  const res = await fetch(`/api/tasks/overdue`);
  const data: OverdueTasksDataType = await res.json();

  return data;
}

export default function OverdueTasks() {
  const { data } = useQuery({ queryKey: ["tasks"], queryFn: getData }) as {
    data: OverdueTasksDataType;
  };

  const { tasks, userProjectNames } = data ? data : defaultData;
  const [activeFilter, setActiveFilter] = useState(TASK_FILTERS[0]);
  const setTasksData = useTasksStore((state) => state.setTasksData);

  const handleFilterClick = (filter: TaskFilterType) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    setTasksData(data);
  }, [data, setTasksData]);

  return (
    <Layout>
      <PageHeader title="Overdue tasks" />

      <FilterBar
        filters={TASK_FILTERS}
        activeFilter={activeFilter}
        filterClickHandler={handleFilterClick}
      />

      <List>
        {tasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </List>
    </Layout>
  );
}
