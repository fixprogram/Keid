import { wrapper } from "@/application/store/store";
import { getProjectById } from "@/entities/project/models/getProjectById";
import { setupProjectData } from "@/templates/ProjectPage/store/projectSlice";
import { getTasksByIds } from "@/entities/task/model/getTasksByIds";
import ProjectPage from "@/templates/ProjectPage";

export default function Project() {
  return <ProjectPage />;
}

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const id = context.query.id as string;
    const project = await getProjectById(id);

    if (!project) {
      throw new Error(`project with id: ${id} wasn't found`);
    }

    const tasks = await getTasksByIds(project.taskIds);

    store.dispatch(
      setupProjectData({ title: project.title, style: project.style, tasks })
    );
  }
);
