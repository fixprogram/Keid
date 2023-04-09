// import { deleteProject } from "@/entities/project/models/deleteProject";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { projectId } = req.body;

//   if (!projectId) {
//     return res.status(400).json({ data: "Project id can't be empty" });
//   }

//   const project = await deleteProject(projectId);

//   res.status(200).json({ id: project.id });
// }
