import { prisma } from "@/db.server";
import { serviceComments } from "@/shared/config/serviceComments";

type Props = {
  userId: string;
  title: string;
  style: string;
  deadline: number;
  repeats: number;
  isPublic?: boolean;
};

export const createChallenge = async ({
  userId,
  title,
  style,
  deadline,
  repeats,
  isPublic = false,
}: Props) => {
  const data = {
    userId,
    title,
    style,
    deadline,
    streak: 0,
    completed: 0,
    repeats,
    description: "",
    isPublic,
    isArchived: false,
    comments: [
      {
        userId,
        content: "",
        time: Date.now().toString(),
        serviceContent: serviceComments.challenge.created,
      },
    ],
  };

  const challenge = await prisma.challenge.create({
    data,
  });

  return challenge;
};
