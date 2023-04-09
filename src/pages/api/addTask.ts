// import { createTask } from "@/entities/task/models/createTask";
// import { NextApiRequest, NextApiResponse } from "next";

// export default async function handler(
//   req: NextApiRequest,
//   res: NextApiResponse
// ) {
//   const { userId, taskName, taskStyle, deadline, projectName } = req.body;

//   if (!taskName) {
//     return res.status(400).json({ data: "Task name can't be empty" });
//   }

//   const task = await createTask({
//     userId,
//     projectName,
//     taskName,
//     taskStyle,
//     deadline,
//   });

//   res.status(200).json({ id: task.id });
// }
