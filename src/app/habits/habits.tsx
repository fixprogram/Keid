"use client";

import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { sortTasks } from "@/shared/lib/utils/sortTasks";
import { List } from "@/shared/ui/List";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { useMemo } from "react";
import { useState } from "react";
import { TaskFilterType, TASK_FILTERS } from "@/entities/task/config/consts";
import { Habit } from "@prisma/client";
import { HabitCard } from "@/entities/habit";
import { hasCompletedToday } from "@/shared/lib/utils/hasCompletedToday";

type FilterType = "Active" | "Completed" | "Archived";
const FILTERS: FilterType[] = ["Active", "Completed", "Archived"];

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

  const [activeFilter, setActiveFilter] = useState<FilterType>(FILTERS[0]);
  // const [activeHabits, setActiveHabits] = useState<Habit[]>([])
  const { habits, userProjectNames } = data ? data : defaultData;

  const filteredHabits: Record<FilterType, Habit[]> = useMemo(() => {
    if (habits.length)
      return {
        Active: habits.filter((habit) => !habit.isArchived && !habit.completed),

        Completed: habits.filter((habit) => habit.completed), // For test purposes. In the future we add a field 'Completed' to projects

        Archived: habits.filter((habit) => habit.isArchived),
      };

    return {
      Active: [],
      Completed: [],
      Archived: [],
    };
  }, [habits]);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  return (
    <Layout>
      <PageHeader title="Habits" />

      <FilterBar
        filters={FILTERS}
        activeFilter={activeFilter}
        filterClickHandler={handleFilterClick}
      />

      <List>
        {filteredHabits[activeFilter as FilterType].map((habit) => (
          <HabitCard
            key={habit.id}
            {...habit}
            hasCompletedToday={hasCompletedToday(habit)}
          />
        ))}
      </List>
    </Layout>
  );
}
