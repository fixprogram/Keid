"use client";

import { DateType, OverviewTab } from "@/templates/DashboardPage";
import React from "react";

// export async function getData(dateType: DateType) {
//   const res = await fetch(`/api/dashboard/overview`, {
//     method: "POST",
//     body: JSON.stringify({ dateType }),
//   });

//   return await res.json();
// }

export default function Overview() {
  return <OverviewTab />;
}
