import { getUserProjects } from "./getUserProjects";

export async function getActiveTaskAmount({ userId }: { userId: string }) {
  const projects = await getUserProjects({ userId });
}
