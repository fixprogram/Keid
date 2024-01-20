"use client";

import { DailyProgress } from "@/features/DailyProgress";
import { WeeklyActivity } from "@/features/WeeklyActivity";
import { WeeklyStatistics } from "@/features/WeeklyStatistics";
import { links } from "@/shared/config/links";
import { fetcher } from "@/shared/lib/utils/fetcher";
import { useDashboardStore, DateType } from "@/templates/DashboardPage";
import useSWR, { SWRConfig } from "swr";

function ProductivityContent() {
  const [dateType] = useDashboardStore((state) => [state.dateType]);

  const { data } = useSWR(
    `${links.productivityOverview}?dateType=${dateType}`,
    fetcher
  );

  if (!data) {
    return null;
  }

  // const { projectAmount, totalTaskAmount, tasks, habits, challenges } = data;

  return (
    <>
      {dateType === DateType.Today ? <DailyProgress {...data} /> : null}

      {dateType === DateType.Week ? (
        <>
          <WeeklyActivity {...data.activity} />
          <WeeklyStatistics {...data} />
        </>
      ) : null}

      {dateType === DateType.Month ? (
        <div className="text-deactive">Empty for now</div>
      ) : null}
    </>
  );
}

export default function Productivity({ initialData }: { initialData: any }) {
  const [dateType] = useDashboardStore((state) => [state.dateType]);

  const key = `${links.productivityOverview}?dateType=${dateType}`;

  return (
    <SWRConfig
      value={{
        fallback: {
          [key]: initialData,
        },
      }}
    >
      <ProductivityContent />
    </SWRConfig>
  );
}
