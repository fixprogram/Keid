import { getData } from "@/app/projects/[id]/page";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const data = await getData(id);

  return NextResponse.json(data);
}
