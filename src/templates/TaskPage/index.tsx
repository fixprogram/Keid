import Layout from "@/widgets/Layout";
import AddSubtaskPopup from "./ui/AddSubtaskPopup";
import TaskBody from "./ui/TaskBody";
import TaskHeader from "./ui/TaskHeader";
import TaskSettings from "./ui/TaskSettings";

export default function TaskPage() {
  return (
    <Layout withNav={false} isBottomGradientShowed={false}>
      <TaskHeader />

      <TaskBody />

      <TaskSettings />

      <AddSubtaskPopup />
    </Layout>
  );
}
