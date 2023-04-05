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

    const userId = session?.user.id as string;

    const projects = await getUserProjects(userId);

    const userProjectNames = projects.map((project) => project.title);

    store.dispatch(setupProjects(projects));
    store.dispatch(setUserProjectNames(userProjectNames));
  }
);
