"use server";

import { Reflection } from "@prisma/client";
import { prisma } from "@/app/lib/prisma/db.server";
import { revalidatePath } from "next/cache";
import { isDateToday } from "@/shared/lib/utils/isDateToday";

export const saveReflection = async (reflectionData: Reflection) => {
  const { userId } = reflectionData;

  const user = await prisma.user.findUnique({ where: { id: userId } });

  const userReflections = user?.reflections ?? [];

  const lastReflection = userReflections?.at(-1);

  if (lastReflection && isDateToday(new Date(Number(lastReflection.date)))) {
    const newReflections = userReflections;
    newReflections.pop();

    await prisma.user.update({
      where: { id: userId },
      data: { reflections: [...newReflections, reflectionData] },
    });
  } else {
    await prisma.user.update({
      where: { id: userId },
      data: { reflections: { push: reflectionData } },
    });
  }

  revalidatePath("dashboard/productivity");
};
