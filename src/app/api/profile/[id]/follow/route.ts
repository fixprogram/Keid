import { prisma } from "@/db.server";
import { getWeeklyActivityData } from "@/features/Activity/api";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, id } = await request.json();

  if (!userId) {
    throw new Error(`userId ${userId} wasn't found`);
  }

  if (!id) {
    throw new Error(`id ${id} wasn't found`);
  }

  const mainUser = await prisma.user.findUnique({
    where: { id: userId },
    select: { following: true },
  });

  if (!mainUser) {
    throw new Error(`User with id ${userId} wasn't found`);
  }

  const userToFollow = await prisma.user.findUnique({
    where: { id },
    select: { followers: true },
  });

  if (!userToFollow) {
    throw new Error(`User with id ${id} wasn't found`);
  }

  await prisma.user.update({
    where: { id: userId },
    data: { following: [...mainUser.following, id] },
  });
  await prisma.user.update({
    where: { id },
    data: { followers: [...userToFollow.followers, userId] },
  });

  //   if (!user) {
  //     throw new Error(`User with id ${id} wasn't found`);
  //   }

  //   const activityData = await getWeeklyActivityData(id);

  //   const data = {
  //     activityData,
  //     userName: user.name,
  //     userEmail: user.email,
  //   };

  return NextResponse.json(true);
}
