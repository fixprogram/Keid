import { getChallengeData } from "@/server/actions";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  const data = await getChallengeData(id);

  return NextResponse.json(data);
}
