import Layout from "@/widgets/Layout";
import { wrapper } from "@/app/store/store";
import { getProjectById } from "@/entities/project/models/getProjectById";
import { setupProjectData } from "@/app/store/projectSlice";
import { getTasksByIds } from "@/entities/task/model/getTasksByIds";
import ProjectHeader from "@/widgets/ProjectHeader";
import ProjectBody from "@/widgets/ProjectBody";

// const DATA = {
//   title: "Launch Keid",
//   id: 3,
//   category: "Text",
//   allTasksAmount: 9,
//   completedTasksAmount: 7,
//   color: "#FFDD72",
//   tasks: [
//     {
//       id: 1,
//       progress: 70,
//       title: "Some task",
//       deadline: "Today",
//     },
//   ],
//   ideas: [
//     {
//       title: "Some idea",
//       description: "Idea description",
//     },
//   ],
// };

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
