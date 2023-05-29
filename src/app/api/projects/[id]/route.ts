import { getUser } from "@/app/lib/session";
import { getProjectById } from "@/entities/project/api/getProjectById";
import { getTasksByIds } from "@/entities/task/api/getTasksByIds";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const projectId = params.id;

  const user = await getUser();

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);

  const project = await getProjectById(projectId);

  if (!project) {
    throw new Error(`project with id: ${projectId} wasn't found`);
  }

  const tasks = await (
    await getTasksByIds(project.taskIds)
  ).map((task) => ({ ...task, isFavourite: project.isStarred }));

  const data = {
    ...project,
    tasks,
    userProjectNames,
  };

  return NextResponse.json(data);
}
