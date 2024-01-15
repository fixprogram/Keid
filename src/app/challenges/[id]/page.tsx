import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { prisma } from "@/app/lib/prisma/db.server";
import { Challenge } from "./challenge";
import { CommentType } from "@prisma/client";
import { getServerUser } from "@/app/lib/getServerUser";

export async function getData(challengeId: string) {
  const user = await getServerUser();

  const challenge = await prisma.challenge.findUnique({
    where: { id: challengeId },
  });

  if (!challenge) {
    throw new Error(`challenge with id: ${challengeId} wasn't found`);
  }

  const host = await prisma.user.findUnique({
    where: { id: challenge.userId },
    select: { name: true },
  });

  if (!host) {
    throw new Error(`User with id ${challenge.userId} wasn't found`);
  }

  challenge.comments = challenge.comments.filter(
    (comment) => comment.type === CommentType.USER_COMMENT
  );

  const memberIds = challenge.members.map((member) => member.id);

  if (memberIds.length) {
    const users = await prisma.user.findMany({
      where: { id: { in: memberIds } },
      select: { name: true, id: true },
    });

    challenge.members = challenge.members.map((member) => {
      const userName = users.find((name) => name.id === member.id)?.name;
      return {
        ...member,
        name: userName,
      };
    });

    challenge.comments = challenge.comments.map((comment) => {
      const userName = users.find((user) => user.id === comment.userId)?.name;

      return { ...comment, userName };
    });
  }

  return {
    ...challenge,
    hostId: challenge.userId,
    userId: user.id,
    hostName: host.name,
  };
}

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["challenge", params.id], () =>
    getData(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Challenge id={params.id} />
    </Hydrate>
  );
}
