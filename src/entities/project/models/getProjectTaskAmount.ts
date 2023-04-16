import { getProjectTasks } from "./getProjectTasks";

export async function getProjectTaskAmount(taskIds: string[]) {
  const { taskWithoutSubtaskIds, subtaskIds } = await getProjectTasks(taskIds);

  return taskWithoutSubtaskIds.length + subtaskIds.length;
}
