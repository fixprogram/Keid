import { updateHabitProgress } from "@/entities/habit/api/updateHabitProgress";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: habitId, progress, comment } = await request.json();

  if (!habitId) {
    return NextResponse.json({ data: "Habit id can't be empty" });
  }

  const task = await updateHabitProgress(habitId, progress, comment);

  return NextResponse.json(task);
}
