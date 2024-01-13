import { completeHabitForToday } from "@/app/lib/data/habit/completeHabitForToday";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id, comment } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Habit id can't be empty" });
  }

  const habit = await completeHabitForToday(id, comment);

  return NextResponse.json(habit);
}
