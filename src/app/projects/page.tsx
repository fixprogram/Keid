import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import { getServerUser } from "../lib/getServerUser";
import { getUserProjects } from "@/app/lib/data/user/getUserProjects";
import Projects from "./projects";

async function getData() {
  const user = await getServerUser();

  const userId = user.id;

  const projects = await getUserProjects(userId);

  const userProjectNames = projects.map((project) => ({
    title: project.title,
    style: project.style,
  }));

  return {
    projects,
    userProjectNames,
    userId,
  };
}

export default async function Hydration() {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["projects"], getData);
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Projects />
    </Hydrate>
  );
}
