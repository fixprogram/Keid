import { prisma } from "@/db.server";
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
    },
  });

  await MailService.sendActivationMail(
    email,
    `${process.env.NEXTAUTH_URL}api/activate/12343`
  );

  return user;
}
