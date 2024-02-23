"use server";
import { prisma } from "@/app/lib/prisma/db.server";
import { Comment, CommentType } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const completeTask = async (id: string, userId: string) => {
  const task = await prisma.task.findUnique({
    where: { id },
    select: { comments: true, progress: true, subtaskIds: true, repeats: true },
  });

  if (!task) {
    throw new Error(`Task with id ${id} wasn't found`);
  }

  const newComment: Comment = {
    userId,
    content: "",
    time: Date.now().toString(),
    serviceContent: null,
    type: CommentType.COMPLETED,
  };

  const newData = {
    completed: Date.now(),
    progress: 100,
    comments: [...task.comments, newComment],
  };

  if (task.repeats === "Everyday") {
    (newData.completed = 0), (newData.progress = 0);
  }

  await prisma.task.update({
    where: { id },
    data: newData,
  });

  // If there are subtasks, recursively update each one
  if (task.subtaskIds.length) {
    for (const subtaskId of task.subtaskIds) {
      await completeTask(subtaskId, userId);
    }
  }

  revalidatePath("/dashboard/overview");
  revalidatePath(`tasks/${id}`);
};
