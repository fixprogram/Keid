import { createSubtask } from "@/entities/subtask/models/createSubtask";
import { getTaskById } from "@/entities/task/models/getTaskById";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, taskId, title, deadline } = req.body;

  if (!taskId) {
    return res
      .status(400)
      .json({ data: `No task with such id: ${taskId} was found` });
  }

  if (!title) {
    return res.status(400).json({ data: "Subtask title cannot be empty" });
  }

  const subtask = await createSubtask({
    userId,
    taskId,
    title,
    deadline,
  });

  res.status(200).json({ id: subtask.taskId });
}
