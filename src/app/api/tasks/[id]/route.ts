import { authOptions } from "@/app/lib/auth";
import { getUser } from "@/app/lib/session";
import { prisma } from "@/db.server";
import { getProjectById } from "@/backend/service/project/getProjectById";
import { getTaskById } from "@/backend/service/task/getTaskById";
import { getUserProjects } from "@/backend/service/user/getUserProjects";
import { CommentType } from "@/features/Comments/config/types";
import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/app/tasks/[id]/page";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const data = await getData(id);

  return NextResponse.json(data);
}
