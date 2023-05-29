import { deleteProject } from "@/entities/project/api/deleteProject";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { projectId } = await request.json();

  if (!projectId) {
    return NextResponse.json({ data: "Project id can't be empty" });
  }

  const project = await deleteProject(projectId);

  return NextResponse.json({ id: project.id });
}
