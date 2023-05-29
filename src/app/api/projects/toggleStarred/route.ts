import { createProject } from "@/entities/project/api/createProject";
import { setProjectFavourite } from "@/entities/project/api/setProjectFavourite";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { projectId, isStarred } = await request.json();

  if (!projectId) {
    return (
      NextResponse
        // .status(400)
        .json({ data: "Project id can't be empty" })
    );
  }

  const project = await setProjectFavourite(projectId, isStarred);

  return NextResponse.json(project);
}
