import { getData } from "@/app/notifications/page";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await getData();

  return NextResponse.json(data);
}
