import { getUser } from "@/app/lib/session";
import { prisma } from "@/db.server";
import { getUserProjects } from "@/backend/service/user/getUserProjects";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();

  const userId = user.id;

  const projects = await prisma.project.findMany({
    where: { userId },
    select: { title: true, style: true, taskIds: true, isStarred: true },
  });
  const userProjectNames = projects.map((project) => ({
    title: project.title,
    style: project.style,
  }));

  const habits = await prisma.habit.findMany({ where: { userId } });

  const data = { userProjectNames, habits };

  return NextResponse.json(data);
}
