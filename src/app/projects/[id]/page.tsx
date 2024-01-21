import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import getUserProjectNames from "@/app/lib/data/user/getUserProjectNames";
import Project from "./project";
import { getProjectById } from "@/app/lib/data/project/getProjectById";
import { getTasksByIds } from "@/app/lib/data/task/getTasksByIds";
import { getProjectData } from "@/server/actions";

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["project"], () => getProjectData(params.id));
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Project id={params.id} />
    </Hydrate>
  );
}
