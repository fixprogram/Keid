"use client";

import { ProjectList, PROJECT_FILTERS } from "@/entities/project";
import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import Icon from "@/shared/ui/Icon";
import {
  FilterType,
  useProjectsStore,
} from "@/entities/project/models/projectsStore";
import Layout from "@/widgets/Layout";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";

async function getData() {
  const res = await fetch(`/api/projects`);
  const data = await res.json();

  return data;
}

export default function Projects() {
  const { data } = useQuery({ queryKey: ["projects"], queryFn: getData });

  const [activeFilter, listStyle, toggleListStyle, setActiveFilter, setData] =
    useProjectsStore(
      (state) => [
        state.activeFilter,
        state.listStyle,
        state.toggleListStyle,
        state.setActiveFilter,
        state.setData,
      ],
      shallow
    );

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  const actionIconName = listStyle === "column" ? "dashboard" : "goals";

  const handleFilterClick = (filter: FilterType) => {
    setActiveFilter(filter);
  };

  return (
    <Layout>
      <PageHeader title="Projects" />

      <FilterBar
        filters={PROJECT_FILTERS}
        activeFilter={activeFilter}
        filterClickHandler={handleFilterClick}
      >
        <button type="button" onClick={toggleListStyle}>
          <Icon name={actionIconName} width={22} height={22} />
        </button>
      </FilterBar>

      <ProjectList listStyle={listStyle} />
    </Layout>
  );
}
