"use client";

import { mapTasks } from "@/entities/task/lib/mapTasks";
import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { sortTasks } from "@/shared/lib/utils/sortTasks";
import { List } from "@/shared/ui/List";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { useState } from "react";
import { shallow } from "zustand/shallow";
import { TaskFilterType, TASK_FILTERS } from "@/entities/task/config/consts";
import { useTasksStore } from "@/entities/task/models/tasksStore";
import { mapTasksIntoHierarchy } from "@/entities/task";

const defaultData = {
  tasks: [],
  userProjectNames: [],
};

async function getData() {
  const res = await fetch(`/api/tasks`);
  const data = await res.json();

  return data;
}

export default function Tasks() {
  const { status, data } = useQuery({
    queryKey: ["tasks"],
    queryFn: getData,
  });

  // const [activeFilter, setActiveFilter] = useState<FilterType>(FILTERS[0]);
  const [activeFilter, setActiveFilter, setTasksData] = useTasksStore(
    (state) => [state.activeFilter, state.setActiveFilter, state.setTasksData],
    shallow
  );

  const { tasks: initialTasks, userProjectNames } = data ? data : defaultData;

  const allTasks = sortTasks(initialTasks);
  const tasks = mapTasks(allTasks);

  const handleFilterClick = (filter: TaskFilterType) => {
    setActiveFilter(filter);
  };

  useEffect(() => {
    setTasksData(data);
  }, [data]);

  const activeTasks = mapTasksIntoHierarchy(tasks[activeFilter]);

  return (
    <Layout>
      <PageHeader title="Tasks" />

      <FilterBar
        filters={TASK_FILTERS}
        activeFilter={activeFilter}
        filterClickHandler={handleFilterClick}
      />

      <List>
        {activeTasks.map((task) => (
          <TaskCard key={task.id} {...task} />
        ))}
      </List>

      {/* <TaskList /> */}
    </Layout>
  );
}
