import { getUser } from "@/app/lib/session";
import { getProjectById } from "@/backend/service/project/getProjectById";
import { getTasksByIds } from "@/backend/service/task/getTasksByIds";
import getUserProjectNames from "@/backend/service/user/getUserProjectNames";
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
  ).map((task) => ({ ...task, isFavorite: project.isStarred }));

  const data = {
    ...project,
    tasks,
    userProjectNames,
  };

  return NextResponse.json(data);
}
