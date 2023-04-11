import { addComment } from "@/entities/task/models/addComment";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, taskId, content } = req.body;

  if (!content) {
    return res.status(400).json({ data: "Content name can't be empty" });
  }

  const comment = await addComment(taskId, userId, content);

  res.status(200).json({ id: comment.id });
}
