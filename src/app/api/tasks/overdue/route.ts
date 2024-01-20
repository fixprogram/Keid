import { getServerUser } from "@/app/lib/getServerUser";
import { prisma } from "@/app/lib/prisma/db.server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getServerUser();

  const userId = user.id;

  const projects = await prisma.project.findMany({
    where: { userId },
    select: { title: true, style: true, taskIds: true, isStarred: true },
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

  const overdueTasks = await prisma.task.findMany({
    where: {
      id: { in: tasksIds },
      deadline: { lt: new Date().setHours(23, 59, 59, 999) },
      AND: { completed: 0 },
      NOT: { deadline: 0 },
    },
  });

  const mappedOverdueTasks = overdueTasks.map((task) => {
    const parentProject = projects.find((project) => {
      if (project.taskIds.some((taskId) => taskId === task.id)) return project;
    });
    const isFavorite = parentProject ? parentProject.isStarred : false;

    return {
      ...task,
      isFavorite,
      projectTitle: parentProject ? parentProject.title : "",
    };
  });

  const data = { tasks: mappedOverdueTasks, userProjectNames };

  return NextResponse.json(data);
}
