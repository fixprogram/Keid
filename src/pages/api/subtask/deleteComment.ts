import { deleteComment } from "@/entities/subtask/models/deleteComment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subtaskId, commentTime } = req.body;

  if (!commentTime) {
    return res.status(400).json({ data: "Comment time name can't be empty" });
  }

  const updatedSubtask = await deleteComment(subtaskId, commentTime);

  res.status(200).json({ id: updatedSubtask.id });
}
