import { getUser } from "@/app/lib/session";
import { getSubtaskById } from "@/entities/subtask/models/getSubtaskById";
import { getTaskById } from "@/entities/task/api/getTaskById";
import { CommentType } from "@/features/Comments/config/types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const subtaskId = params.id;

  const user = await getUser();

  const userName = user.name as string;

  const data = await getSubtaskById(subtaskId);

  if (!data) {
    throw new Error(`Subtask with id: ${subtaskId} wasn't found`);
  }

  const parentTask = await getTaskById(data.taskId);

  if (!parentTask) {
    throw new Error(`Project with id: ${subtaskId} wasn't found`);
  }

  const comments: CommentType[] = [];
  data.comments.forEach((comment) => {
    comments.push({ ...comment, userName });
  });

  return NextResponse.json({
    ...data,
    comments,
    style: parentTask.style,
    parentTitle: parentTask.title,
  });
}
