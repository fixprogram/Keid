import { createProject } from "@/entities/project/models/createProject";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const body = req.body;

  console.log("body: ", body);

  if (!body.projectName) {
    // Sends a HTTP bad request error code
    return res.status(400).json({ data: "Project name can't be empty" });
  }

  const { userId, projectName, projectStyle } = body;

  const project = await createProject(userId, projectName, projectStyle);

  console.log("Project, ", project);
  // Found the name.
  // Sends a HTTP success code
  res.status(200).json({ id: project.id });
}
