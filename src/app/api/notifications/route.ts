import { authOptions } from "@/app/lib/auth";
import { getUser } from "@/app/lib/session";
import { getData } from "@/app/notifications/page";
import { prisma } from "@/db.server";
import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  //   const { id } = await getUser();

  //   const user = await prisma.user.findUnique({
  //     where: { id },
  //     select: { notifications: true, name: true },
  //   });

  //   if (!user) {
  //     throw new Error(`User with id ${id} wasn't found`);
  //   }

  //   const { notifications, name } = user;

  const data = await getData();

  return NextResponse.json(data);
}
