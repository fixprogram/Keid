import { deleteHabit } from "@/backend/service/habit/deleteHabit";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { itemId: id } = await request.json();

  if (!id) {
    return NextResponse.json({ data: "Habit id can't be empty" });
  }

  const habit = await deleteHabit(id);

  return NextResponse.json(habit);
}
