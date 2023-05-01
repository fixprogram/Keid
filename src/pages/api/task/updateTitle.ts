import { updateTitle } from "@/entities/task/models/updateTitle";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { taskId, title } = req.body;

  const task = await updateTitle(taskId, title);

  res.status(200).json({ id: task.id });
}
