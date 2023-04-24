import { getSession } from "next-auth/react";
import { wrapper } from "@/application/store/store";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import { prisma } from "@/db.server";
import { OverdueTasksPage } from "@/templates/OverdueTaskPage";
import { Task } from "@prisma/client";

interface OverdueTasksPropsType {
  tasks: Task[];
}

export default function OverdueTasks({ tasks }: OverdueTasksPropsType) {
  return <OverdueTasksPage tasks={tasks} />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession(context);

    if (!session) {
      throw new Error("session is not defined");
    }

    const user = session.user as { id: string };
    const userId = user.id;

    const projects = await prisma.project.findMany({
      where: { userId },
      select: { title: true, style: true, taskIds: true },
    });
    const userProjectNames = projects.map((project) => ({
      title: project.title,
      style: project.style,
    }));

    const tasksIds: string[] = [];
    projects.forEach((project) => {
      tasksIds.push(...project.taskIds);
    });

    const overdueTasks = await prisma.task.findMany({
      where: {
        id: { in: tasksIds },
        deadline: { lt: Date.now() },
        AND: { completed: 0 },
        NOT: { deadline: 0 },
      },
    });

    store.dispatch(setUserProjectNames(userProjectNames));

    return {
      props: { tasks: overdueTasks },
    };
  }
);
