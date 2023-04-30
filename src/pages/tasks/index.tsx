import { getSession } from "next-auth/react";
import { wrapper } from "@/application/store/store";
import { setUserProjectNames } from "@/widgets/Navigation/model/navigationSlice";
import { setupTasks } from "@/templates/TasksPage/store/tasksSlice";
import { getTasksByIds } from "@/entities/task/models/getTasksByIds";
import TasksPage from "@/templates/TasksPage";
import { prisma } from "@/db.server";

export default function Tasks() {
  return <TasksPage />;
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
      select: { title: true, style: true, taskIds: true, isStarred: true },
    });
    const userProjectNames = projects.map((project) => ({
      title: project.title,
      style: project.style,
    }));

    const tasksIds: string[] = [];
    const taskWithoutProjectIds = await prisma.task.findMany({
      where: { projectId: userId },
      select: { id: true },
    });
    taskWithoutProjectIds.forEach((task) => {
      tasksIds.push(task.id);
    });

    projects.forEach((project) => {
      tasksIds.push(...project.taskIds);
    });

    const tasks = await (
      await getTasksByIds(tasksIds)
    ).map((task) => {
      const isFavourite = Boolean(
        projects.find((project) =>
          project.taskIds.some((taskId) => taskId === task.id)
        )?.isStarred
      );
      return { ...task, isFavourite };
    });

    store.dispatch(setupTasks(tasks));
    store.dispatch(setUserProjectNames(userProjectNames));

    return {
      props: {},
    };
  }
);
