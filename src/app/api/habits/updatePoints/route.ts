import { updatePoints } from "@/app/lib/data/habit/updatePoints";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id, newPoints } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Habit id can't be empty" });
  }

  const habit = await updatePoints(id, newPoints);

  return NextResponse.json(habit);
}
