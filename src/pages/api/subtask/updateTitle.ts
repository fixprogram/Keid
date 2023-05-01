import { updateTitle } from "@/entities/subtask/models/updateTitle";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subtaskId, title } = req.body;

  const subtask = await updateTitle(subtaskId, title);

  res.status(200).json({ id: subtask.id });
}
