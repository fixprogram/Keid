import { authOptions } from "@/app/lib/auth";
import { getUser } from "@/app/lib/session";
import { prisma } from "@/db.server";
import { getProjectById } from "@/backend/service/project/getProjectById";
import { getSubtasksByIds } from "@/backend/service/subtask/getSubtasksByIds";
import { getTaskById } from "@/backend/service/task/getTaskById";
import { getUserProjects } from "@/backend/service/user/getUserProjects";
import { CommentType } from "@/features/Comments/config/types";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const taskId = params.id;

  const user = await getUser();

  const userName = user.name as string;

  // const taskId = context.query.id as string;
  const task = await getTaskById(taskId);

  if (!task) {
    throw new Error(`Task with id: ${taskId} wasn't found`);
  }

  const subtasks = await getSubtasksByIds(task.subtaskIds);

  const comments: CommentType[] = [];
  task.comments.forEach((comment) => {
    comments.push({ ...comment, userName });
  });

  const taskData = {
    ...task,
    taskId,
    subtasks,
    // comments,
  };

  // store.dispatch(setupCommentsData({ comments }));

  const parentProject = await getProjectById(task.projectId);

  const data = {
    ...taskData,
    projectTitle: parentProject ? parentProject.title : "No project",
    projectStyle: parentProject ? parentProject.style : "01",
  };

  return NextResponse.json(data);
}
