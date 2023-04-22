import { wrapper } from "@/application/store/store";
import {
  setUserId,
  setUserOverdueTaskAmount,
  setUserProjectAmount,
  setUserTaskAmount,
} from "@/widgets/Overview/store/overviewSlice";
import { getSession } from "next-auth/react";
import Layout from "@/widgets/Layout";
import Greeting from "@/shared/ui/Greeting";
import Icon from "@/shared/ui/Icon";
import Overview from "@/widgets/Overview";
import Link from "next/link";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { prisma } from "@/db.server";
import { getWeekTasks } from "@/features/WeekTasks/api";
import { setupWeekTasks } from "@/features/WeekTasks/store/weekTasksSlice";

export default function DashboardPage() {
  return (
    <Layout>
      <div className="flex items-center justify-between">
        <h2 className="text-white text-xl font-poppins font-semibold">
          Dashboard
        </h2>

        <Link href="/profile" className="w-[48px] h-[48px] rounded-full">
          <Icon name="avatar" width={48} height={48} />
        </Link>
      </div>

      <Greeting />

      <Overview />
    </Layout>
  );
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
        where: { id: { in: totalTasksIds }, deadline: { lt: Date.now() } },
        select: { id: true },
      });

      store.dispatch(setUserId(userId));
      store.dispatch(setUserProjectAmount(projectAmount));
      store.dispatch(setUserTaskAmount(totalTasksIds.length));
      store.dispatch(setUserOverdueTaskAmount(overdueTasks.length));
      store.dispatch(setUserProjectNames(userProjectNames));
      store.dispatch(setupWeekTasks(weekTasks));
      // console.log("State on server", store.getState());
      // await prisma.task.updateMany({ data: { completed: 0 } }); // Add this trick to Anki in order to remember

      return { props: {} };
    }
);
