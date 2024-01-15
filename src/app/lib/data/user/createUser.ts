import { prisma } from "@/app/lib/prisma/db.server";
import { MailService } from "@/shared/service/mail-service";
import bcryptjs from "bcryptjs";

type CreateUserProps = {
  email: string;
  name: string;
  password: string;
};

export async function createUser({ email, name, password }: CreateUserProps) {
  const passwordHash = bcryptjs.hashSync(password, 7);

  const user = await prisma.user.create({
    data: {
      email,
      name,
      passwordHash,
      projectIds: [],
      followers: [],
      following: [],
      notifications: [],
    },
  });

  await MailService.sendActivationMail(
    email,
    `${process.env.NEXT_PUBLIC_NEXTAUTH_URL}api/activate/12343`
  );

  return user;
}
