import { setProjectFavourite } from "@/entities/project/models/setProjectFavourite";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { projectId, isStarred } = req.body;

  if (!projectId) {
    return res.status(400).json({ data: "Project id can't be empty" });
  }

  const project = await setProjectFavourite(projectId, isStarred);

  res.status(200).json({ id: project.id });
}
