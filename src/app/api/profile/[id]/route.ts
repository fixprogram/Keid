import { prisma } from "@/app/lib/prisma/db.server";
import { getWeeklyActivityData } from "@/features/Activity/api";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const { id } = await request.json();

  const user = await prisma.user.findUnique({ where: { id } });

  if (!user) {
    // throw new Error(`User with id ${id} wasn't found`);

    return NextResponse.json(
      { message: `User with id ${id} wasn't found` },
      { status: 404 }
    );
  }

  const activityData = await getWeeklyActivityData(id);

  const data = {
    activityData,
    userName: user.name,
    userEmail: user.email,
  };

  return NextResponse.json(data);
}
