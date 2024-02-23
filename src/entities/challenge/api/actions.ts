"use server";
import { prisma } from "@/app/lib/prisma/db.server";
import { Comment, CommentType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const completeChallengeForToday = async (id: string, userId: string) => {
  const challenge = await prisma.challenge.findUnique({
    where: { id },
    select: { comments: true, streak: true, repeats: true },
  });

  if (!challenge) {
    throw new Error(`Challenge with id ${id} wasn't found`);
  }

  const newStreak = challenge.streak + 1;
  const newCompleted = newStreak === challenge.repeats ? Date.now() : 0;

  const newComment: Comment = {
    userId,
    content: "",
    time: Date.now().toString(),
    serviceContent: null,
    type: newCompleted ? CommentType.COMPLETED : CommentType.PROGRESS_UPDATE,
  };

  const newComments = [...challenge.comments, newComment];

  await prisma.challenge.update({
    where: { id },
    data: {
      streak: newStreak,
      comments: newComments,
      completed: new Date(),
    },
  });

  revalidatePath("dashboard/overview");
  revalidatePath(`challenges/${id}`);
};
