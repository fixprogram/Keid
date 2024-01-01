import { getData } from "@/app/dashboard/productivity/page";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();

  const data = await getData(body.dateType);

  return NextResponse.json(data);
}
