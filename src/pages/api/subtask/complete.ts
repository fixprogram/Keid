import { completeSubtask } from "@/entities/subtask/models/completeSubtask";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subtaskId } = req.body;

  if (!subtaskId) {
    return res
      .status(400)
      .json({ data: `No subtask with such id: ${subtaskId} was found` });
  }

  const subtask = await completeSubtask(subtaskId);

  res.status(200).json({ id: subtask.taskId });
}
