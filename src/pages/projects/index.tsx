import { getSession } from "next-auth/react";
import { getUserProjects } from "@/entities/user/models/getUserProjects";
import { setupProjects } from "@/templates/ProjectsPage/store/projectsSlice";
import { wrapper } from "@/application/store/store";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import ProjectsPage from "@/templates/ProjectsPage";

export default function Projects() {
  return <ProjectsPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession(context);

    if (!session) {
      throw new Error("session is not defined");
    }

    const user = session.user as { id: string };
    const userId = user.id;

    const projects = (await getUserProjects(userId)).map((project) => ({
      ...project,
      taskAmount: project.taskIds.length,
    }));

    const userProjectNames = projects.map((project) => ({
      title: project.title,
      style: project.style,
    }));

    store.dispatch(setupProjects(projects));
    store.dispatch(setUserProjectNames(userProjectNames));

    return {
      props: {},
    };
  }
);
