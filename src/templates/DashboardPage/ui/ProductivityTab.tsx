import { FC, useEffect } from "react";
import { DateType, useDashboardStore } from "../model/useDashboardStore";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/app/dashboard/productivity/productivity";
import { DashboardHeader } from "./DashboardHeader";
import Layout from "@/widgets/Layout";
import { WeeklyStatistics } from "@/features/WeeklyStatistics";
import Tabs from "./Tabs";
import { WeeklyActivity } from "@/features/WeeklyActivity";

export const ProductivityTab: FC = () => {
  const [dateType, dashboardData, setData] = useDashboardStore((state) => [
    state.dateType,
    state.productivityData,
    state.setProductivityData,
  ]);

  const { data } = useQuery({
    queryKey: ["dashboard", "productivity", dateType],
    queryFn: () => getData(dateType),
  });

  const { projects, activity } = dashboardData;

  useEffect(() => {
    if (data) {
      setData(data);
    }
  }, [data, setData]);

  return (
    <Layout>
      <DashboardHeader />

      <Tabs />

      {dateType === DateType.Today ? (
        <>
          <WeeklyStatistics projects={projects} />
          <WeeklyActivity {...activity} />
        </>
      ) : null}

      {dateType === DateType["This week"] ? (
        <div style={{ color: "wheat" }}>Empty for now</div>
      ) : null}

      {dateType === DateType["This month"] ? (
        <div style={{ color: "wheat" }}>Empty for now</div>
      ) : null}
    </Layout>
  );
};
