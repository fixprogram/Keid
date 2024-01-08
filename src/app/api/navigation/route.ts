import { getUser } from "@/app/lib/session";
import getUserProjectNames from "@/backend/service/user/getUserProjectNames";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const user = await getUser();

  if (!user) {
    return NextResponse.json({ message: "Unauthenticated" }, { status: 401 });
  }

  const userId = user.id;
  const userProjectNames = await getUserProjectNames(userId);
  const projectAmount = userProjectNames.length;

  const data = {
    projectAmount,
    userProjectNames,
    userId,
    userName: user.name,
  };

  return NextResponse.json(data);
}
