import { authOptions } from "@/app/lib/auth";
import { getUser } from "@/app/lib/session";
import { prisma } from "@/db.server";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { getUserProjects } from "@/entities/user/models/getUserProjects";
import { getWeeklyActivityData } from "@/features/Activity/api";
// import { getWeekTasks } from "@/features/WeekTasks/api";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();

  const userId = user.id;

  const activityData = await getWeeklyActivityData(userId);

  const data = {
    activityData,
    userName: user.name,
    userEmail: user.email,
  };

  return NextResponse.json(data);
}
