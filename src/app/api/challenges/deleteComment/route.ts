import { deleteComment } from "@/app/lib/data/challenge/deleteComment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id, commentTime } = await request.json();

  if (!commentTime) {
    return NextResponse.json({ data: "Comment time can't be empty" });
  }

  const task = await deleteComment(id, commentTime);

  return NextResponse.json(task);
}
