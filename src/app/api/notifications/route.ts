import { getNotificationsData } from "@/server/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await getNotificationsData();

  return NextResponse.json(data);
}
