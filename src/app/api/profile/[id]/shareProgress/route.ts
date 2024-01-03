import { getData } from "@/app/dashboard/productivity/productivity";
import { prisma } from "@/db.server";
import { getWeeklyActivityData } from "@/features/Activity/api";
import { DateType } from "@/templates/DashboardPage/model/useDashboardStore";
import { Notification, NotificationType } from "@prisma/client";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId } = await request.json();

  if (!userId) {
    throw new Error(`userId ${userId} wasn't found`);
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { followers: true, name: true },
  });

  if (!user) {
    throw new Error(`User with id ${userId} wasn't found`);
  }

  const followerIds = user.followers;

  const { allTasks, allProjects, maxActivity } = await getWeeklyActivityData(
    userId
  );

  const notification: Notification = {
    date: new Date().getTime().toString(),
    userId,
    type: NotificationType.REPORT,
    content: `${user.name} finished the day with ${allTasks} tasks completed from ${allProjects} projects and total points are ${maxActivity}`,
  };

  //   const followers = await prisma
  await prisma.user.updateMany({
    where: { id: { in: followerIds } },
    data: {
      notifications: {
        push: notification,
      },
    },
  });

  //   const data = await getData(DateType.Today);

  return NextResponse.json(true);
}
