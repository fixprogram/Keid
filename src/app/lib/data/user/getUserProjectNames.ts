import { prisma } from "@/app/lib/prisma/db.server";

export default async function getUserProjectNames(userId: string) {
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { title: true, style: true, metrics: true },
  });

  return projects.map((project) => ({ ...project }));
}
