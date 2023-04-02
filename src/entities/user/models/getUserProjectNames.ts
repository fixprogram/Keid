import { prisma } from "@/db.server";

export default async function getUserProjectNames(userId: string) {
  const projects = await prisma.project.findMany({
    where: { userId },
    select: { title: true },
  });

  return projects.map((project) => project.title);
}
