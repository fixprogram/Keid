import { FC, useEffect } from "react";
import { DateType, useDashboardStore } from "../model/useDashboardStore";
import { useQuery } from "@tanstack/react-query";
import { getData } from "@/app/dashboard/productivity/productivity";
import { DashboardHeader } from "./DashboardHeader";
import Layout from "@/widgets/Layout";
import { WeeklyStatistics } from "@/features/WeeklyStatistics";
import { Tabs } from "./Tabs";
import { WeeklyActivity } from "@/features/WeeklyActivity";
import { useNavigationStore } from "@/widgets/Navigation/model/useNavigationStore";
import { useShareProgress } from "../model/useShareProgress";

export const ProductivityTab: FC = () => {
  const userId = useNavigationStore((state) => state.userId);
  const [dateType, dashboardData, setData] = useDashboardStore((state) => [
    state.dateType,
    state.productivityData,
    state.setProductivityData,
  ]);

  const handleShareProgress = useShareProgress(userId);

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
          {/* <button className="text-white" onClick={handleShareProgress}>
            Share progress
          </button> */}
          <WeeklyStatistics projects={projects} />
        </>
      ) : null}

      {dateType === DateType.Week ? <WeeklyActivity {...activity} /> : null}

      {dateType === DateType.Month ? (
        <div style={{ color: "wheat" }}>Empty for now</div>
      ) : null}
    </Layout>
  );
};
