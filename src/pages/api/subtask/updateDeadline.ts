import { updateSubtaskDeadline } from "@/entities/subtask/models/updateSubtaskDeadline";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { subtaskId, deadline } = req.body;

  const subtask = await updateSubtaskDeadline(subtaskId, deadline);

  res.status(200).json({ id: subtask.id });
}
