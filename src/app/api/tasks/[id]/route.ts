import { NextRequest, NextResponse } from "next/server";
import { getTaskData } from "@/server/actions";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const data = await getTaskData(id);

  return NextResponse.json(data);
}
