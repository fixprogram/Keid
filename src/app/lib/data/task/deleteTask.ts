import { prisma } from "@/app/lib/prisma/db.server";

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

  // Если родитель - проект, то обновляем проект
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
    // Если родитель - задача, то находим ее и удаляем из ее списка подзадач ту, которую мы удаляем в рамках этого метода
  } else {
    const parentTask = await prisma.task.findUnique({
      where: { id: task.parentId },
      select: { subtaskIds: true },
    });

    const newSubtaskIds = parentTask?.subtaskIds.filter(
      (item) => item !== taskId
    );

    await prisma.task.update({
      where: { id: task.parentId },
      data: { subtaskIds: newSubtaskIds },
    });
  }

  return task;
};
