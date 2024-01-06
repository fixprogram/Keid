import { prisma } from "@/db.server";

export const deleteTaskAndSubtasks = async (taskId: string) => {
  const task = await prisma.task.delete({
    where: { id: taskId },
    select: { subtaskIds: true, parentId: true, projectId: true },
  });

  if (task.subtaskIds.length) {
    for (const subtaskId of task.subtaskIds) {
      await deleteTaskAndSubtasks(subtaskId);
    }
  }

  if (task.parentId === task.projectId) {
    const project = await prisma.project.findUnique({
      where: { id: task.projectId },
    });

    if (!project) {
      return task;
    }

    const newTaskIds = project.taskIds.filter((id) => {
      if (id !== taskId) return id;
    });

    await prisma.project.update({
      where: { id: project.id },
      data: { taskIds: [...newTaskIds] },
    });
  }

  return task;
};
