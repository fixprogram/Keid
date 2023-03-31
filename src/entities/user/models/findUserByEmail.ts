import { prisma } from "@/db.server";

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  return user;
}
