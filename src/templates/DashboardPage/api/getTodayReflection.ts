import { prisma } from "@/app/lib/prisma/db.server";
import { getTodayTimestamps } from "@/shared/lib/utils/getTodayTimestamps";

export const getTodayReflection = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { reflections: true },
  });

  const { startTimestamp, endTimestamp } = getTodayTimestamps();

  return user?.reflections.find(
    (item) =>
      new Date(Number(item.date)).getTime() >= startTimestamp &&
      new Date(Number(item.date)).getTime() <= endTimestamp
  );
};
