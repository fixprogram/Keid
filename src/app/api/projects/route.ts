import { getUser } from "@/app/lib/session";
import { getUserProjects } from "@/app/lib/data/user/getUserProjects";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();

  const userId = user.id;

  const projects = await getUserProjects(userId);

  const data = {
    projects,
  };

  return NextResponse.json(data);
}
