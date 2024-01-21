// import { authOptions } from "@/app/lib/auth";
import { getServerUser } from "@/app/lib/getServerUser";
import { prisma } from "@/app/lib/prisma/db.server";
import { getTasksByIds } from "@/app/lib/data/task/getTasksByIds";
import { getUserProjects } from "@/app/lib/data/user/getUserProjects";
import { Project } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getServerUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const userId = user.id;

  const projects = await prisma.project.findMany({
    where: { userId },
    select: {
      id: true,
      title: true,
      style: true,
      taskIds: true,
      isStarred: true,
    },
  });
  const userProjectNames = projects.map((project) => ({
    title: project.title,
    style: project.style,
  }));

  const tasksIds: string[] = [];
  const taskWithoutProjectIds = await prisma.task.findMany({
    where: { projectId: userId },
    select: { id: true },
  });
  taskWithoutProjectIds.forEach((task) => {
    tasksIds.push(task.id);
  });

  projects.forEach((project) => {
    tasksIds.push(...project.taskIds);
  });

  const tasks = await (
    await getTasksByIds(tasksIds)
  ).map((task) => {
    const parentProject = projects.find(
      (project) => project.id === task.projectId
    );
    const isFavorite = parentProject ? parentProject.isStarred : false;

    return {
      ...task,
      isFavorite,
      projectTitle: parentProject ? parentProject.title : "",
    };
  });

  const data = { userProjectNames, tasks };

  return NextResponse.json(data);
}
