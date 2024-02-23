import { prisma } from "@/app/lib/prisma/db.server";
import { serviceComments } from "@/shared/config/serviceComments";
import { Notification, NotificationType } from "@prisma/client";
import { revalidatePath } from "next/cache";

type Props = {
  userId: string;
  title: string;
  style: string;
  deadline: Date;
  repeats: number;
  memberIds: string[];
  points: number;
  isPublic?: boolean;
};

export const createChallenge = async ({
  userId,
  title,
  style,
  deadline,
  repeats,
  memberIds,
  isPublic = false,
  points,
}: Props) => {
  const data = {
    userId,
    title,
    style,
    deadline,
    streak: 0,
    completed: null,
    failed: null,
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
    members: memberIds.map((memberId) => ({
      id: memberId,
      streak: 0,
      failed: null,
      completed: null,
      comments: [],
    })),
    points,
  };

  const challenge = await prisma.challenge.create({
    data,
  });

  if (memberIds.length) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { name: true },
    });

    if (!user) {
      throw new Error(`User with id ${userId} wasn't found`);
    }

    const notification: Notification = {
      date: Date.now().toString(),
      userId,
      type: NotificationType.CHALLENGE,
      content: `${user.name} has challenged you with ${title}`,
    };

    await prisma.user.updateMany({
      where: { id: { in: memberIds } },
      data: { notifications: { push: notification } },
    });
  }

  revalidatePath("/dashboard/overview");
  revalidatePath("/challenges");

  return challenge;
};
