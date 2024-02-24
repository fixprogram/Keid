import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/app/lib/prisma/db.server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const entity = searchParams.get("entity");
  const ids = searchParams.get("ids");

  if (!entity || !ids) {
    return NextResponse.json({ data: [] });
  }

  // TODO
  const parsedIds = JSON.parse(JSON.parse(ids));

  if (!Array.isArray(parsedIds)) {
    return NextResponse.json({});
  }

  if (entity === "Task") {
    const tasks = await prisma.task.findMany({
      where: { id: { in: parsedIds } },
    });

    return NextResponse.json({ data: tasks });
  }

  // if(entity === 'Habit') {
  const habits = await prisma.habit.findMany({
    where: { id: { in: parsedIds } },
  });

  return NextResponse.json({ data: habits });
  // }
}
