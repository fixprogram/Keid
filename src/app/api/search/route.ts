import { getData } from "@/app/search/page";
import { prisma } from "@/app/lib/prisma/db.server";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await getData();

  return NextResponse.json(data);
}
