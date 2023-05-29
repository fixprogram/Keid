import { authOptions } from "@/app/lib/auth";
import { getUser } from "@/app/lib/session";
import { prisma } from "@/db.server";
import { getTasksByIds } from "@/entities/task/api/getTasksByIds";
import { getUserProjects } from "@/entities/user/models/getUserProjects";
import { Project } from "@prisma/client";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();

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

  // const tasks = await (
  //   await getTasksByIds(tasksIds)
  // ).map((task) => {
  //   const isFavourite = Boolean(
  //     projects.find((project) =>
  //       project.taskIds.some((taskId) => taskId === task.id)
  //     )?.isStarred
  //   );
  //   return { ...task, isFavourite };
  // });

  const tasks = await (
    await getTasksByIds(tasksIds)
  ).map((task) => {
    const parentProject = projects.find(
      (project) => project.id === task.projectId
    );
    const isFavourite = parentProject ? parentProject.isStarred : false;

    return {
      ...task,
      isFavourite,
      projectTitle: parentProject ? parentProject.title : "",
    };
  });

  const data = { userProjectNames, tasks };

  return NextResponse.json(data);
}
