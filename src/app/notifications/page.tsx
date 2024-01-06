import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { getUser } from "../lib/session";
import { getUserProjects } from "@/backend/service/user/getUserProjects";
import { Notifications } from "./notifications";
import { prisma } from "@/db.server";

export async function getData() {
  const { id } = await getUser();

  const user = await prisma.user.findUnique({
    where: { id },
    select: { notifications: true },
  });

  if (!user) {
    throw new Error(`User with id ${id} wasn't found`);
  }

  const { notifications } = user;

  const notificationUserIds = [
    ...new Set(notifications.map((notification) => notification.userId)),
  ];

  const notificationUsers = await prisma.user.findMany({
    where: { id: { in: notificationUserIds } },
    select: { id: true, name: true },
  });

  return notifications
    .map((notification) => ({
      ...notification,
      userName: notificationUsers.find(
        (user) => user.id === notification.userId
      )?.name,
    }))
    .reverse();
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["notifications"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Notifications />
    </Hydrate>
  );
}
