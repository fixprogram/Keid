import { wrapper } from "@/application/store/store";
import {
  setUserId,
  setUserOverdueTaskAmount,
  setUserProjectAmount,
  setUserTaskAmount,
} from "@/widgets/Overview/store/overviewSlice";
import { getSession } from "next-auth/react";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { prisma } from "@/db.server";
import { getWeekTasks } from "@/features/WeekTasks/api";
import { setupWeekTasks } from "@/features/WeekTasks/store/weekTasksSlice";
import { DashboardPage } from "@/templates/DashboardPage";

export default function Dashboard() {
  return <DashboardPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const session = await getSession({ req });

      if (!session) {
        throw new Error("session is not defined");
      }

      const user = session.user as { id: string };
      const userId = user.id;
      const userProjectNames = await getUserProjectNames(userId);
      const projects = await await prisma.project.findMany({
        where: { userId },
        select: { id: true, taskIds: true },
      });

      const projectIDs = projects.map((projectId) => projectId.id);

      const weekTasks = await getWeekTasks(projectIDs);

      const projectAmount = userProjectNames.length;
      const totalTasksIds: string[] = [];
      projects.forEach((project) => {
        totalTasksIds.push(...project.taskIds);
      });

      const overdueTasks = await prisma.task.findMany({
        where: {
          id: { in: totalTasksIds },
          deadline: { lt: Date.now() },
          NOT: { deadline: 0 },
        },
        select: { id: true, title: true },
      });

      // console.log("Overdue tasks: ", overdueTasks);

      store.dispatch(setUserId(userId));
      store.dispatch(setUserProjectAmount(projectAmount));
      store.dispatch(setUserTaskAmount(totalTasksIds.length));
      store.dispatch(setUserOverdueTaskAmount(overdueTasks.length));
      store.dispatch(setUserProjectNames(userProjectNames));
      store.dispatch(setupWeekTasks(weekTasks));
      // console.log("State on server", store.getState());
      // await prisma.subtask.updateMany({
      //   data: { deadline: Date.now() },
      // }); // Add this trick to Anki in order to remember

      return { props: {} };
    }
);
