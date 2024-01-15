import { prisma } from "@/app/lib/prisma/db.server";
import { getWeeklyActivityData } from "@/features/Activity/api";
import { Notification, NotificationType } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic"; // Force dynamic (server) route instead of static page

export async function GET() {
  const users = await prisma.user.findMany({
    select: { id: true, name: true, followers: true },
  });

  await Promise.all(
    users.map(async (user) => {
      if (user.followers.length) {
        const { allTasks, allProjects, maxActivity } =
          await getWeeklyActivityData(user.id);

        const notification: Notification = {
          date: new Date().getTime().toString(),
          userId: user.id,
          type: NotificationType.REPORT,
          content: `${user.name} finished the day with ${allTasks} tasks completed from ${allProjects} projects and total points are ${maxActivity}`,
        };

        await prisma.user.updateMany({
          where: { id: { in: user.followers } },
          data: {
            notifications: {
              push: notification,
            },
          },
        });
      }
    })
  );

  return NextResponse.json(true);
}
