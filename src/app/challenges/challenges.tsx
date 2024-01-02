"use client";

import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import { List } from "@/shared/ui/List";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { FC, useMemo } from "react";
import { useState } from "react";
import { Challenge, Habit } from "@prisma/client";
import { HabitCard } from "@/entities/habit";
import { ChallengeCard } from "@/entities/challenge";

type FilterType = "Active" | "Completed" | "Archived";
const FILTERS: FilterType[] = ["Active", "Completed", "Archived"];

type ChallengesDataType = {
  challenges: Challenge[];
  userProjectNames: [];
};

const defaultData = {
  challenges: [],
  userProjectNames: [],
};

async function getData() {
  const res = await fetch(`/api/challenges`);
  const data: ChallengesDataType = await res.json();

  return data;
}

export const Challenges: FC = () => {
  const { data } = useQuery({ queryKey: ["challenges"], queryFn: getData }) as {
    data: ChallengesDataType;
  };

  const [activeFilter, setActiveFilter] = useState<FilterType>(FILTERS[0]);
  const { challenges, userProjectNames } = data ? data : defaultData;

  const filteredChallenges: Record<FilterType, Habit[]> = useMemo(() => {
    if (challenges.length)
      return {
        Active: challenges.filter(
          (challenge) => !challenge.isArchived && !challenge.completed
        ),

        Completed: challenges.filter((challenge) => challenge.completed), // For test purposes. In the future we add a field 'Completed' to projects

        Archived: challenges.filter((challenge) => challenge.isArchived),
      };

    return {
      Active: [],
      Completed: [],
      Archived: [],
    };
  }, [challenges]);

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  return (
    <Layout>
      <PageHeader title="Challenges" />

      <FilterBar
        filters={FILTERS}
        activeFilter={activeFilter}
        filterClickHandler={handleFilterClick}
      />

      <List>
        {filteredChallenges[activeFilter as FilterType].map((challenge) => (
          <ChallengeCard key={challenge.id} {...challenge} />
        ))}
      </List>
    </Layout>
  );
};
