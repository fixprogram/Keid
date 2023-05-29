import { createProject } from "@/entities/project/api/createProject";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, projectName, projectStyle } = await request.json();

  if (!projectName || !userId) {
    return (
      NextResponse
        // .status(400)
        .json({ data: "Project name and userId can't be empty" })
    );
  }

  const project = await createProject(userId, projectName, projectStyle);

  return NextResponse.json({ id: project.id });
}
