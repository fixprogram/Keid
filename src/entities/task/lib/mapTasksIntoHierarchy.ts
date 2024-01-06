import { TaskType } from "@/shared/config/types";

const buildTree = (allTasks: TaskType[], parentId: string): TaskType[] => {
  return allTasks
    .filter((task) => task.parentId === parentId)
    .map((task) => ({
      ...task,
      subtasks: buildTree(allTasks, task.id),
    }));
};

export const mapTasksIntoHierarchy = (tasks: TaskType[]) => {
  const rootTasks = tasks.filter((task) => task.parentId === task.projectId);

  // Build the tree for each root-level task
  const taskTrees = rootTasks.map((rootTask) => ({
    ...rootTask,
    subtasks: buildTree(tasks, rootTask.id),
  }));

  return taskTrees;
};
