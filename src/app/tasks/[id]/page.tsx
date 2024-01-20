import getQueryClient from "@/utils/getQueryClient";
import Hydrate from "@/utils/hydrate.client";
import { dehydrate } from "@tanstack/query-core";
import Task from "./task";
import { getTaskData } from "@/server/actions";

export default async function Hydration({
  params,
}: {
  params: { id: string };
}) {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(["task", params.id], () =>
    getTaskData(params.id)
  );
  const dehydratedState = dehydrate(queryClient);

  return (
    <Hydrate state={dehydratedState}>
      <Task id={params.id} />
    </Hydrate>
  );
}
