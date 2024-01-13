import { setNewProjectName } from "@/app/lib/data/project/setNewProjectName";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { projectId, newProjectName } = await request.json();

  if (!projectId) {
    return NextResponse.json({ data: "Project id can't be empty" });
  }

  const project = await setNewProjectName(projectId, newProjectName);

  return NextResponse.json(project);
}
