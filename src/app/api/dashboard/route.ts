// import { authOptions } from "@/app/lib/auth";
// import { getUser } from "@/app/lib/session";
// import { getWeekTasks } from "@/app/model/task/api/getThisWeekTasks";
// import { prisma } from "@/db.server";
// import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
// import { getWeeklyActivityData } from "@/features/WeeklyActivity/api";
// import { redirect } from "next/navigation";
// import { NextResponse } from "next/server";

// export async function GET(request: Request) {
//   const user = await getUser();

//   const userId = user.id;
//   const userProjectNames = await getUserProjectNames(userId);
//   const projects = await prisma.project.findMany({
//     where: { userId },
//     select: { id: true, taskIds: true, isStarred: true },
//   });

//   const projectIDs = projects.map((projectId) => projectId.id);
//   projectIDs.push(userId);

//   const weekTasks = await (
//     await getWeekTasks(projectIDs)
//   ).map((task) => {
//     const isFavorite = Boolean(
//       projects.find((project) =>
//         project.taskIds.some((taskId) => taskId === task.id)
//       )?.isStarred
//     );

//     return { ...task, isFavorite };
//   });

//   const projectAmount = userProjectNames.length;
//   const totalTasksIds: string[] = [];

//   const taskWithoutProjectIds = await prisma.task.findMany({
//     where: { projectId: userId },
//     select: { id: true },
//   });
//   taskWithoutProjectIds.forEach((task) => {
//     totalTasksIds.push(task.id);
//   });
//   projects.forEach((project) => {
//     totalTasksIds.push(...project.taskIds);
//   });

//   const totalTaskAmount = totalTasksIds.length;

//   const overdueTasks = await prisma.task.findMany({
//     where: {
//       id: { in: totalTasksIds },
//       deadline: { lt: new Date().setHours(23, 59, 59, 999) },
//       AND: { completed: 0 },
//       NOT: { deadline: 0 },
//     },
//     select: { id: true },
//   });

//   const overdueTaskAmount = overdueTasks.length;

//   const weeklyActivityData = await getWeeklyActivityData(userId);

//   const habits = await prisma.habit.findMany({ where: { userId } });

//   const data = {
//     projectAmount,
//     overdueTaskAmount,
//     totalTaskAmount,
//     weekTasks,
//     userName: user.name,
//     projects: weeklyActivityData.projects,
//     activityFeed: weeklyActivityData.activityFeed,
//     habits,
//   };

//   return NextResponse.json(data);
// }
