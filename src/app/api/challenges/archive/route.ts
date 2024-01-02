import { archiveChallenge } from "@/backend/service/challenge/archiveChallenge";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Project id can't be empty" });
  }

  const project = await archiveChallenge(id);

  return NextResponse.json({ id: project.id });
}
