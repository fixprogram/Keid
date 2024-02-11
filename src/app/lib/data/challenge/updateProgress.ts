// import { prisma } from "@/app/lib/prisma/db.server";
// import { serviceComments } from "@/shared/config/serviceComments";
// import { Comment, CommentType } from "@prisma/client";

// export const updateProgress = async (
//   id: string,
//   newStreak: number,
//   comment: Comment
// ) => {
//   const challenge = await prisma.challenge.findUnique({
//     where: { id },
//     select: { comments: true, streak: true, repeats: true },
//   });

//   if (!challenge) {
//     throw new Error(`Challenge with id ${id} wasn't found`);
//   }

//   const streakDifference = newStreak - challenge.streak;

//   const newComment = {
//     ...comment,
//     serviceContent:
//       serviceComments.challenge.updatedProgress +
//       `${streakDifference > 0 ? " +" : " "}${streakDifference}%`,
//     type: CommentType.PROGRESS_UPDATE,
//   };

//   const data = {
//     streak: newStreak,
//     comments: [...challenge.comments, newComment],
//     completed: newStreak === challenge.repeats ? Date.now() : 0,
//   };

//   const updatedChallenge = await prisma.challenge.update({
//     where: { id },
//     data,
//   });

//   return updatedChallenge;
// };
