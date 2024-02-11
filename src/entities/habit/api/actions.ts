"use server";
import { prisma } from "@/app/lib/prisma/db.server";
import { Comment, CommentType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const completeHabitForToday = async (id: string, userId: string) => {
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

  revalidatePath("dashboard/overview");
  revalidatePath(`habits/${id}`);
};
