import Layout from "@/widgets/Layout";
import AddSubtaskPopup from "@/widgets/SubtaskList/components/AddSubtaskPopup";
import TaskBody from "./components/TaskBody";
import TaskHeader from "./components/TaskHeader";
import TaskSettings from "./components/TaskSettings";

export default function TaskPage() {
  return (
    <Layout withNav={false}>
      <TaskHeader />

      <TaskBody />

      <TaskSettings />

      <AddSubtaskPopup />
    </Layout>
  );
}
