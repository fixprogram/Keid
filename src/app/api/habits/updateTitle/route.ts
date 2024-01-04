import { updateTitle } from "@/backend/service/habit/updateTitle";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { todoId: id, title } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Habit id can't be empty" });
  }

  const habit = await updateTitle(id, title);

  return NextResponse.json(habit);
}
