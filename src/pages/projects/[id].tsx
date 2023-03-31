import Layout from "@/widgets/Layout";
import ProjectBody from "@/components/ProjectBody";
import ProjectHeader from "@/widgets/ProjectHeader";
import { wrapper } from "@/shared/store/store";
import { getProjectById } from "@/entities/project/models/getProjectById";
import { setupProjectData } from "@/shared/store/projectSlice";
import { getTasksByIds } from "@/entities/task/model/getTasksByIds";

const DATA = {
  title: "Launch Keid",
  id: 3,
  category: "Text",
  allTasksAmount: 9,
  completedTasksAmount: 7,
  color: "#FFDD72",
  tasks: [
    {
      id: 1,
      progress: 70,
      title: "Some task",
      deadline: "Today",
    },
  ],
  ideas: [
    {
      title: "Some idea",
      description: "Idea description",
    },
  ],
};

const Project = () => {
  return (
    <Layout>
      <ProjectHeader />

      <ProjectBody screen="Task List" />
    </Layout>
  );
};

export default Project;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req }) => {
      const url = req.url as string;
      const id = url.split("/").at(-1) as string;
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
