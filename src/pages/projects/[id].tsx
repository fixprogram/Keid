import { wrapper } from "@/application/store/store";
import { getProjectById } from "@/entities/project/models/getProjectById";
import { setupProjectData } from "@/templates/ProjectPage/store/projectSlice";
import { getTasksByIds } from "@/entities/task/models/getTasksByIds";
import ProjectPage from "@/templates/ProjectPage";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import { getSession } from "next-auth/react";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { setUserId } from "@/widgets/Overview/store/overviewSlice";

export default function Project() {
  return <ProjectPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession(context);
    if (!session) {
      throw new Error("session is not defined");
    }

    const user = session.user as { id: string };
    const userId = user.id;
    const userProjectNames = await getUserProjectNames(userId);

    const id = context.query.id as string;
    const project = await getProjectById(id);

    if (!project) {
      throw new Error(`project with id: ${id} wasn't found`);
    }

    const tasks = await getTasksByIds(project.taskIds);

    store.dispatch(
      setupProjectData({
        title: project.title,
        style: project.style,
        tasks,
        isStarred: project.isStarred,
      })
    );
    store.dispatch(setUserProjectNames(userProjectNames));
    store.dispatch(setUserId(userId));

    return {
      props: {},
    };
  }
);
