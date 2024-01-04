import { prisma } from "@/db.server";

export const updateTitle = async (id: string, newTitle: string) => {
  const habit = await prisma.habit.findUnique({
    where: { id },
  });

  if (!habit) {
    throw new Error(`Task with id ${id} wasn't found`);
  }

  const data = {
    title: newTitle,
  };

  await prisma.habit.update({ where: { id }, data });

  return habit;
};
