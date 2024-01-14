import { getServerUser } from "@/app/lib/getServerUser";
import { prisma } from "@/db.server";
import { Comment, CommentType, Member } from "@prisma/client";

export const complete = async (id: string, comment: Comment) => {
  const user = await getServerUser();
  const challenge = await prisma.challenge.findUnique({
    where: { id },
    select: { comments: true, streak: true, userId: true, members: true },
  });

  if (!challenge) {
    throw new Error(`Challenge with id ${id} wasn't found`);
  }

  const newComment = {
    ...comment,
    serviceContent: null,
    type: CommentType.PROGRESS_UPDATE,
  };

  if (challenge.userId !== user.id) {
    const index = challenge.members.indexOf(
      challenge.members.find((member) => member.id === user.id) as Member
    );
    challenge.members[index].comments.push(newComment);
    challenge.members[index].streak += 1;

    const updatedChallenge = await prisma.challenge.update({
      where: { id },
      data: challenge,
    });

    return updatedChallenge;
  }

  const data = {
    streak: challenge.streak + 1,
    // completed: Date.now(),
    comments: [...challenge.comments, newComment],
  };

  const updatedChallenge = await prisma.challenge.update({
    where: { id },
    data,
  });

  return updatedChallenge;
};
