import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { Suspense } from "react";
import { getOverviewData } from "@/server/actions";
import Overview from "./overview";

export default async function Page() {
  const data = await getOverviewData();

  if (!data) {
    return null;
  }

  return (
    // <Suspense fallback={null}>
    <Overview initialData={data} />
    // </Suspense>
  );
}
