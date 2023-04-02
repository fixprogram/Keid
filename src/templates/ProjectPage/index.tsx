import Layout from "@/widgets/Layout";
import ProjectBody from "./components/ProjectBody";
import ProjectHeader from "./components/ProjectHeader";
import ProjectSettings from "./components/ProjectSettings";

export default function ProjectPage() {
  return (
    <Layout>
      <ProjectHeader />

      <ProjectBody screen="Task List" />

      <ProjectSettings />
    </Layout>
  );
}
