import { completeTask } from "@/entities/task/models/completeTask";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { taskId } = req.body;

  if (!taskId) {
    return res.status(400).json({ data: "Task id can't be empty" });
  }

  const task = await completeTask(taskId);

  res.status(200).json({ id: task.id });
}
