"use client";

import Activity from "@/features/Activity";
import { DailyProgress } from "@/features/DailyProgress";
import { DailyTasks } from "@/features/DailyTasks";
import { WeeklyActivity } from "@/features/WeeklyActivity";
import { WeeklyProgress } from "@/features/WeeklyProgress";
import { WeeklyStatistics } from "@/features/WeeklyStatistics";
import { WeekTasks } from "@/features/WeekTasks";
import { Greeting } from "@/shared/ui/Greeting";
import Icon from "@/shared/ui/Icon";
import { useDashboardStore } from "@/templates/DashboardPage/dashboardStore";
import Layout from "@/widgets/Layout";
import Cards from "@/widgets/Overview/components/Cards";
import Filter from "@/widgets/Overview/components/Filter";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import React, { useEffect } from "react";
import { shallow } from "zustand/shallow";

// const defaultDashboardData = {
//   overdueTaskAmount: 0,
//   projectAmount: 0,
//   totalTaskAmount: 0,
//   userName: "",
//   weekTasks: [],
//   projects: [],
//   activityFeed: [],
//   habits: [],
// };

const defaultData = {
  activityData: {
    days: [],
    allTasks: 0,
    allProjects: 0,
    maxActivity: 0,
  },
};

async function getData() {
  const res = await fetch(`/api/dashboard`);
  return await res.json();
}

export default function Dashboard() {
  const { data } = useQuery({ queryKey: ["dashboard"], queryFn: getData });
  const { activityData } = defaultData;

  const activeFilter = useDashboardStore((state) => state.activeFilter);

  const [dashboardData, setData] = useDashboardStore(
    (state) => [state.data, state.setData],
    shallow
  );

  const {
    overdueTaskAmount,
    projectAmount,
    totalTaskAmount,
    userName,
    weekTasks,
    projects,
    activityFeed,
    habits,
  } = dashboardData;

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data]);

  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-poppins font-semibold">
          Dashboard
        </h2>

        <Link href="/profile" className="w-[40px] h-[40px] rounded-full">
          <Icon name="avatar" width={40} height={40} />
        </Link>
      </div>

      {/* <Greeting name={userName} /> */}

      <Filter />

      {activeFilter === "Overview" ? (
        <>
          <DailyTasks tasks={habits} />

          <WeekTasks tasks={weekTasks} />

          <Cards
            cards={[
              { type: "Task", amount: totalTaskAmount },
              { type: "Habit", amount: overdueTaskAmount },
              { type: "Project", amount: projectAmount },
            ]}
          />
        </>
      ) : (
        <>
          <h2 style={{ color: "white", marginTop: 20 }}>
            Statistics for Today
          </h2>
          {/* <DailyProgress tasks={habits} /> */}
          {/* <WeeklyProgress tasks={weekTasks} /> */}
          <WeeklyStatistics projects={projects} />
          {/* <WeeklyActivity data={activityFeed} /> */}
          <Activity {...activityData} />
        </>
      )}
    </Layout>
  );
}
