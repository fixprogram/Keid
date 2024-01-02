import { archiveHabit } from "@/backend/service/habit/archiveHabit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: habitId } = await request.json();

  if (!habitId) {
    return NextResponse.json({ data: "Habit id can't be empty" });
  }

  const task = await archiveHabit(habitId);

  return NextResponse.json(task);
}
