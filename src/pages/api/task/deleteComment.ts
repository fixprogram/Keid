import { deleteComment } from "@/entities/task/models/deleteComment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { taskId, commentTime } = req.body;

  if (!commentTime) {
    return res.status(400).json({ data: "Comment time name can't be empty" });
  }

  const updatedTask = await deleteComment(taskId, commentTime);

  res.status(200).json({ id: updatedTask.id });
}
