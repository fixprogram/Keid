import { getUser } from "@/app/lib/session";
import { prisma } from "@/db.server";
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
    const isFavourite = parentProject ? parentProject.isStarred : false;

    return {
      ...task,
      isFavourite,
      projectTitle: parentProject ? parentProject.title : "",
    };
  });

  const data = { tasks: mappedOverdueTasks, userProjectNames };

  return NextResponse.json(data);
}
