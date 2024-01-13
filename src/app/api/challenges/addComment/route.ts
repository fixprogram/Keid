import { addComment } from "@/app/lib/data/challenge/addComment";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, itemId: id, comment } = await request.json();

  if (!comment) {
    return NextResponse.json({ data: "Comment can't be empty" });
  }

  const task = await addComment(id, userId, comment);

  return NextResponse.json(task);
}
