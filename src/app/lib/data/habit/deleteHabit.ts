import { prisma } from "@/app/lib/prisma/db.server";

export const deleteHabit = async (id: string) => {
  const habit = await prisma.habit.delete({
    where: { id },
  });

  return habit;
};
