import bcrypt from "bcryptjs";
import { prisma } from "@/db.server";
import { MailService } from "@/shared/service/mail-service";

type CreateUserProps = {
  email: string;
  name: string;
  password: string;
};

export async function createUser({ email, name, password }: CreateUserProps) {
  const passwordHash = bcrypt.hashSync(password, 7);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      projectIds: [],
    },
  });

  await MailService.sendActivationMail(
    email,
    `${process.env.NEXTAUTH_URL}api/activate/12343`
  );

  return user;
}

export async function getUserProjects({ userId }: { userId: string }) {
  const user = await prisma.user.findUnique({ where: { id: userId } });

  if (!user) {
    throw new Error(`User with user id: ${userId} wasn't found`);
  }

  const userProjects = prisma.project.findMany({
    where: { id: { in: user.projectIds } },
  });
  return userProjects;
}

export async function getActiveTaskAmount({ userId }: { userId: string }) {
  const projects = await getUserProjects({ userId });
}

export async function getUsers() {
  const users = await prisma.user.findMany();

  return JSON.stringify(users);
}

export async function findUserByEmail(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });

  return user;
}
