import { NextRequest, NextResponse } from "next/server";
import { getData } from "@/app/challenges/[id]/page";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const data = await getData(id);

  return NextResponse.json(data);
}
