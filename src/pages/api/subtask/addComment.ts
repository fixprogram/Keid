import { addComment } from "@/entities/subtask/models/addComment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, subtaskId, content } = req.body;

  if (!content) {
    return res.status(400).json({ data: "Content name can't be empty" });
  }

  const comment = await addComment(subtaskId, userId, content);

  res.status(200).json({ id: comment.id });
}
