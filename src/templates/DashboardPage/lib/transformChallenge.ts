import { getIsCompletedForToday } from "@/entities/challenge";
import { Member } from "@prisma/client";

export type MappedMember = Member & { name: string };

interface TransformChallengePropsType {
  data: any;
}

export const transformChallenge = ({ data }: TransformChallengePropsType) => {
  const result = data;

  const {
    userId,
    hostId,
    streak: hostStreak,
    completed: hostCompleted,
    failed: hostFailed,

    members: challengeMembers,
    hostName,
  } = result;

  let members = challengeMembers;
  let streak = hostStreak;
  let completed = hostCompleted;
  let failed = hostFailed;

  if (
    hostId !== userId &&
    Boolean(members.find((member: MappedMember) => member.id === userId))
  ) {
    const userData = members.find(
      (member: MappedMember) => member.id === userId
    );

    challengeMembers.unshift({ id: hostId, streak, completed, failed });

    result.members = challengeMembers
      .filter((member: MappedMember) => member.id !== userId)
      .map((member: MappedMember) => {
        if (member.id === hostId) {
          return { ...member, name: hostName };
        }

        return member;
      });
    result.streak = userData.streak;
    result.completed = userData.completed;
    result.failed = userData.failed;

    // result.isCompletedForToday = getIsCompletedForToday(data, userId);
  }

  return result;
};
