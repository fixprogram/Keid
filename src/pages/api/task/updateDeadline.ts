import { updateDeadline } from "@/entities/task/models/updateDeadline";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { taskId, deadline } = req.body;

  const task = await updateDeadline(taskId, deadline);

  res.status(200).json({ id: task.id });
}
