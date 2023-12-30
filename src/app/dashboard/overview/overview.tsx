"use client";

import { DateType } from "@/templates/DashboardPage/model/dashboardStore";
import { OverviewTab } from "@/templates/DashboardPage/ui/OverviewTab";
import React from "react";

export async function getData(dateType: DateType) {
  const res = await fetch(`/api/dashboard/overview`, {
    method: "POST",
    body: JSON.stringify({ dateType }),
  });

  return await res.json();
}

export default function Overview() {
  return <OverviewTab />;
}
