import { wrapper } from "@/application/store/store";
import { setUserProjectNames } from "@/widgets/Navigation/store/navigationSlice";
import { getSession } from "next-auth/react";
import getUserProjectNames from "@/entities/user/models/getUserProjectNames";
import { setUserId } from "@/widgets/Overview/store/overviewSlice";
import TaskPage from "@/templates/TaskPage";
import { getTaskById } from "@/entities/task/models/getTaskById";
import { setupTaskData } from "@/templates/TaskPage/store/taskSlice";
import { getProjectById } from "@/entities/project/models/getProjectById";

export default function Project() {
  return <TaskPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession(context);
    const userId = session?.user.id as string;
    const userProjectNames = await getUserProjectNames(userId);

    const id = context.query.id as string;
    const data = await getTaskById(id);

    if (!data) {
      throw new Error(`Task with id: ${id} wasn't found`);
    }

    const parentProject = await getProjectById(data.projectId);

    if (!parentProject) {
      throw new Error(`Project with id: ${id} wasn't found`);
    }

    store.dispatch(
      setupTaskData({
        ...data,
        projectTitle: parentProject.title,
        projectStyle: parentProject.style,
      })
    );
    store.dispatch(setUserProjectNames(userProjectNames));
    store.dispatch(setUserId(userId));
  }
);
