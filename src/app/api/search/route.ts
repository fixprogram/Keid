import { getData } from "@/app/search/page";
import { prisma } from "@/db.server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await getData();

  return NextResponse.json(data);
}
