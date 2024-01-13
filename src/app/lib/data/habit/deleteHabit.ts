import { prisma } from "@/db.server";

export const deleteHabit = async (id: string) => {
  const habit = await prisma.habit.delete({
    where: { id },
  });

  return habit;
};
