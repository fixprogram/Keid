"use client";

import { HabitCard } from "@/entities/habit/ui/HabitCard";
import { mapTasks } from "@/entities/task/lib/mapTasks";
import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { sortTasks } from "@/shared/lib/utils/sortTasks";
import { List } from "@/shared/ui/List";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useState } from "react";
import { TaskFilterType, TASK_FILTERS } from "@/entities/task/config/consts";
import { Habit } from "@prisma/client";

type HabitsDataType = {
  habits: Habit[];
  userProjectNames: [];
};

const defaultData = {
  habits: [],
  userProjectNames: [],
};

async function getData() {
  const res = await fetch(`/api/habits`);
  const data: HabitsDataType = await res.json();

  return data;
}

export default function Habits() {
  const { data } = useQuery({ queryKey: ["habits"], queryFn: getData }) as {
    data: HabitsDataType;
  };

  const [activeFilter, setActiveFilter] = useState<TaskFilterType>(
    TASK_FILTERS[0]
  );
  const { habits, userProjectNames } = data ? data : defaultData;

  // const allTasks = sortTasks(initialTasks);
  // const tasks = mapTasks(allTasks);

  const handleFilterClick = (filter: TaskFilterType) => {
    setActiveFilter(filter);
  };

  return (
    <Layout>
      <PageHeader title="Habits" />

      <FilterBar
        filters={TASK_FILTERS}
        activeFilter={activeFilter}
        filterClickHandler={handleFilterClick}
      />

      <List>
        {habits.map((habit) => (
          <HabitCard key={habit.id} link={`/habits/${habit.id}`} {...habit} />
        ))}
      </List>
    </Layout>
  );
}
