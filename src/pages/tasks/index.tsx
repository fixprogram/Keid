import { getSession } from "next-auth/react";
import { getUserProjects } from "@/entities/user/models/getUserProjects";
import { setupProjects } from "@/templates/ProjectsPage/store/projectsSlice";
import { wrapper } from "@/application/store/store";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import ProjectsPage from "@/templates/ProjectsPage";
import { setupTasks } from "@/templates/TasksPage/store/tasksSlice";
import { getTasksByIds } from "@/entities/task/models/getTasksByIds";
import TasksPage from "@/templates/TasksPage";

export default function Tasks() {
  return <TasksPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession(context);

    const userId = session?.user.id as string;

    const projects = await getUserProjects(userId);
    const userProjectNames = projects.map((project) => project.title);

    const tasksIds: string[] = [];
    projects.forEach((project) => {
      tasksIds.push(...project.taskIds);
    });

    const tasks = await getTasksByIds(tasksIds);

    store.dispatch(setupTasks(tasks));
    // store.dispatch(setupProjects(projects));
    store.dispatch(setUserProjectNames(userProjectNames));
  }
);
