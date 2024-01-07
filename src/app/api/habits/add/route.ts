import { createHabit } from "@/backend/service/habit/createHabit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, habitName, habitStyle, points } = await request.json();

  if (!habitName || !userId) {
    return (
      NextResponse
        // .status(400)
        .json({ data: "Habit name and userId can't be empty" })
    );
  }

  const habit = await createHabit(userId, habitName, habitStyle, points);

  return NextResponse.json({ id: habit.id });
}
