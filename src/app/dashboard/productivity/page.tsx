import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { getProductivityData } from "@/server/actions";
import { Suspense } from "react";
import Productivity from "./productivity";

export const revalidate = 3600;

export default async function Page() {
  const dateType = DateType.Today;

  const data = await getProductivityData(dateType);

  return (
    <Suspense fallback={null}>
      <Productivity initialData={data} />
    </Suspense>
  );
}
