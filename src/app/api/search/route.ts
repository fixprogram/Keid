import { getSearchData } from "@/server/actions";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const data = await getSearchData();

  return NextResponse.json(data);
}
