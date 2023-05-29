import { getUser } from "@/app/lib/session";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);
  const projectAmount = userProjectNames.length;

  const data = {
    projectAmount,
    userProjectNames,
    userId,
  };

  return NextResponse.json(data);
}
