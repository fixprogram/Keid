import { getOverviewData } from "@/server/actions";
import { DateType } from "@/templates/DashboardPage";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // const dateType = request.nextUrl.searchParams.get("dateType") as DateType;

  const data = await getOverviewData();

  return NextResponse.json(data);
}
