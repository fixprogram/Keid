import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Layout from "@/widgets/Layout";
import AddSubtaskPopup from "./components/AddSubtaskPopup";
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
