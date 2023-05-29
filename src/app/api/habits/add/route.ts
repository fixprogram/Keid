import { createHabit } from "@/entities/habit/models/createHabit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, habitName, habitStyle } = await request.json();

  if (!habitName || !userId) {
    return (
      NextResponse
        // .status(400)
        .json({ data: "Habit name and userId can't be empty" })
    );
  }

  const habit = await createHabit(userId, habitName, habitStyle);

  return NextResponse.json({ id: habit.id });
}
