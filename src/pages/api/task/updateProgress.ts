import { updateProgress } from "@/entities/task/models/updateProgress";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { taskId, progress } = req.body;

  await updateProgress(taskId, progress);

  res.status(200).json({ body: "" });
}
