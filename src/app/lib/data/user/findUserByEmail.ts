import { prisma } from "@/db.server";

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findFirst({ where: { email } });

  return user;
}
