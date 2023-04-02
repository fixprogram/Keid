import { createProject } from "@/entities/project/models/createProject";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId, projectName, projectStyle } = req.body;

  if (!projectName || !userId) {
    return res
      .status(400)
      .json({ data: "Project name and userId can't be empty" });
  }

  const project = await createProject(userId, projectName, projectStyle);

  res.status(200).json({ id: project.id });
}
