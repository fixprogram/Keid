import { createHabit } from "@/app/lib/data/habit/createHabit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { userId, habitName, habitStyle, points, repeats } =
    await request.json();

  if (!habitName || !userId) {
    return (
      NextResponse
        // .status(400)
        .json({ data: "Habit name and userId can't be empty" })
    );
  }

  const habit = await createHabit(
    userId,
    habitName,
    habitStyle,
    points,
    repeats
  );

  return NextResponse.json({ id: habit.id });
}
