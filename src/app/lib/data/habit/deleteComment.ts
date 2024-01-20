import { prisma } from "@/app/lib/prisma/db.server";

export async function deleteComment(id: string, commentTime: string) {
  const habit = await prisma.habit.findUnique({ where: { id } });

  if (!habit) {
    throw new Error(`Habit with id ${id} wasn't found`);
  }

  const updatedComments = habit.comments.filter(
    (comment) => comment.time !== commentTime
  );

  return await prisma.habit.update({
    where: { id: habit.id },
    data: {
      comments: [...updatedComments],
    },
  });
}
