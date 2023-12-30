import { getData } from "@/app/dashboard/overview/overview";
import { DailyTasks } from "@/features/DailyTasks";
import { WeekTasks } from "@/features/WeekTasks";
import Cards from "@/widgets/Overview/components/Cards";
import Filter from "@/widgets/Overview/components/Filter";
import { useQuery } from "@tanstack/react-query";
import { FC, useEffect } from "react";
import { useDashboardStore, DateType } from "../model/dashboardStore";
import { DashboardHeader } from "./DashboardHeader";
import Layout from "@/widgets/Layout";

export const OverviewTab: FC = () => {
  const [dateType, dashboardData, setData] = useDashboardStore((state) => [
    state.dateType,
    state.data,
    state.setData,
  ]);

  console.log("dateType: ", dateType);

  const { data } = useQuery({
    queryKey: ["dashboard", "overview", dateType],
    queryFn: () => getData(dateType),
  });
  //   const { activityData } = defaultData;

  const {
    overdueTaskAmount,
    projectAmount,
    totalTaskAmount,
    // userName,
    tasks: weekTasks,
    // projects,
    // activityFeed,
    habits,
  } = dashboardData;

  useEffect(() => {
    if (data) {
      console.log("data: ", data);

      setData(data);
    }
  }, [data, setData]);

  //   console.log("weekTasks: ", weekTasks);

  return (
    <Layout>
      <DashboardHeader />

      <Filter />

      {dateType === DateType.Today ? <DailyTasks tasks={habits} /> : null}

      {dateType === DateType["This week"] ? (
        <WeekTasks tasks={weekTasks} />
      ) : null}

      {dateType === DateType["This month"] ? (
        <div style={{ color: "wheat" }}>Empty for now</div>
      ) : null}

      <Cards
        cards={[
          { type: "Task", amount: totalTaskAmount },
          { type: "Habit", amount: overdueTaskAmount },
          { type: "Project", amount: projectAmount },
        ]}
      />
    </Layout>
  );
};
