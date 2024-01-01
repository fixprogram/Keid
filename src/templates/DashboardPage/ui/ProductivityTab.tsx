import { FC, useEffect } from "react";
import { DateType, useDashboardStore } from "../model/useDashboardStore";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/app/dashboard/productivity/productivity";
import { DashboardHeader } from "./DashboardHeader";
import Layout from "@/widgets/Layout";
import { WeeklyStatistics } from "@/features/WeeklyStatistics";
import Tabs from "./Tabs";

export const ProductivityTab: FC = () => {
  const [dateType, dashboardData, setData] = useDashboardStore((state) => [
    state.dateType,
    state.data,
    state.setData,
  ]);

  const { data } = useQuery({
    queryKey: ["dashboard", "overview", dateType],
    queryFn: () => getData(dateType),
  });

  const { projects } = dashboardData;

  useEffect(() => {
    if (data) {
      console.log("data: ", data);
      setData(data);
    }
  }, [data, setData]);

  return (
    <Layout>
      <DashboardHeader />

      <Tabs />

      {dateType === DateType.Today ? (
        <WeeklyStatistics projects={projects} />
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
