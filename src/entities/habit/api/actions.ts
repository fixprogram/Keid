"use server";
import { prisma } from "@/app/lib/prisma/db.server";
import { Comment, CommentType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export async function completeHabitForToday(id: string, userId: string) {
  try {
    const habit = await prisma.habit.findUnique({
      where: { id },
      select: { comments: true, streak: true },
    });

    if (!habit) {
      throw new Error(`Habit with id ${id} wasn't found`);
    }

    const comment: Comment = {
      userId,
      content: "",
      time: Date.now().toString(),
      serviceContent: null,
      type: CommentType.PROGRESS_UPDATE,
    };

    await prisma.habit.update({
      where: { id },
      data: {
        streak: habit.streak + 1,
        comments: [...habit.comments, comment],
      },
    });
  } catch (error) {
    throw Error(`Something went wrong when completing a habit`);
  }

  revalidatePath("/dashboard/overview");
  // revalidatePath(`/habits/${id}`);
}
