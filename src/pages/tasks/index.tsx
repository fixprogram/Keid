import { getSession } from "next-auth/react";
import { getUserProjects } from "@/entities/user/models/getUserProjects";
import { wrapper } from "@/application/store/store";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import { setupTasks } from "@/templates/TasksPage/store/tasksSlice";
import { getTasksByIds } from "@/entities/task/models/getTasksByIds";
import TasksPage from "@/templates/TasksPage";

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

    const projects = await getUserProjects(userId);
    const userProjectNames = projects.map((project) => ({
      title: project.title,
      style: project.style,
    }));

    const tasksIds: string[] = [];
    projects.forEach((project) => {
      tasksIds.push(...project.taskIds);
    });

    const tasks = await getTasksByIds(tasksIds);

    store.dispatch(setupTasks(tasks));
    store.dispatch(setUserProjectNames(userProjectNames));

    return {
      props: {},
    };
  }
);
