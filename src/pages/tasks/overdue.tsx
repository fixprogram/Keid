import { getSession } from "next-auth/react";
import { wrapper } from "@/application/store/store";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import { getTasksByIds } from "@/entities/task/models/getTasksByIds";
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

    const tasks = await getTasksByIds(tasksIds);

    const overdueTasks = tasks.filter(
      (task) =>
        task.deadline !== 0 &&
        task.deadline < Date.now() &&
        !Boolean(task.completed)
    );

    store.dispatch(setUserProjectNames(userProjectNames));

    return {
      props: { tasks: overdueTasks },
    };
  }
);
