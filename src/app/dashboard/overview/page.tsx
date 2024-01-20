import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { Suspense } from "react";
import { getOverviewData } from "@/server/actions";
import Overview from "./overview";

export const revalidate = 3600;

export default async function Page() {
  const dateType = DateType.Today;

  const data = await getOverviewData(dateType);

  return (
    <Suspense fallback={null}>
      <Overview initialData={data} />
    </Suspense>
  );
}
