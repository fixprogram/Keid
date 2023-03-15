import Layout from "@/components/Layout";
import ProjectBody from "@/components/ProjectBody";
import ProjectHeader from "@/components/ProjectHeader";
import { useRouter } from "next/router";

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

const Goal = () => {
  const router = useRouter();
  const { id } = router.query;

  const { title, tasks, color } = DATA;

  const screens = ["Overview"];

  if (tasks) {
    screens.push("Task List");
  }

  return (
    <Layout>
      <ProjectHeader title={title} color={color} screens={screens} />

      <ProjectBody screen="Task List" />
    </Layout>
  );
};

export default Goal;
