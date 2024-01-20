import { prisma } from "@/app/lib/prisma/db.server";
import { transformChallenge } from "../lib/transformChallenge";
import { isDateToday } from "@/shared/lib/utils/isDateToday";
import { Challenge, CommentType, Member } from "@prisma/client";
import { getServerUser } from "@/app/lib/getServerUser";

export async function transformChallenges(challenges: Challenge[]) {
  const user = await getServerUser();
  const userId = user.id;

  const hostIds = challenges.map((challenge) => challenge.userId);

  const hosts = await prisma.user.findMany({
    where: { id: { in: [...new Set(hostIds)] } },
    select: { id: true, name: true },
  });

  const mappedChallenges = challenges.map((challenge) => {
    const host = hosts.find((host) => host.id === challenge.userId);

    let isCompletedForToday = false;

    if (userId && userId !== challenge.userId) {
      const member = challenge.members.find(
        (member) => member.id === userId
      ) as Member;

      isCompletedForToday = Boolean(
        member.comments.filter(
          (comment) =>
            comment.type === CommentType.PROGRESS_UPDATE &&
            isDateToday(new Date(Number(comment.time)))
        ).length
      );
    } else {
      isCompletedForToday = Boolean(
        challenge.comments.filter(
          (comment) =>
            comment.type === CommentType.PROGRESS_UPDATE &&
            isDateToday(new Date(Number(comment.time)))
        ).length
      );
    }

    return transformChallenge({
      data: {
        ...challenge,
        hostId: host?.id,
        userId,
        hostName: host?.name,
        isCompletedForToday,
      },
    });
  });

  return mappedChallenges;
}

export const getTodayChallenges = async (userId: string) => {
  const challenges = await prisma.challenge.findMany({
    where: {
      OR: [
        { userId, isArchived: false },
        { members: { some: { id: userId } }, isArchived: false },
      ],
    },
  });

  const transformedChallenges = await transformChallenges(challenges);

  return transformedChallenges;
};
