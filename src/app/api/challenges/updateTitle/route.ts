import { updateTitle } from "@/app/lib/data/challenge/updateTitle";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todoId: id, title } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Challenge id can't be empty" });
  }

  const task = await updateTitle(id, title);

  return NextResponse.json(task);
}
