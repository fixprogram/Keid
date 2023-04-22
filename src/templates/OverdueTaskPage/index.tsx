import PageHeader from "@/features/PageHeader";
import Layout from "@/widgets/Layout";
import { FC } from "react";
import TaskList from "../TasksPage/components/TaskList";

export const OverdueTasksPage: FC = () => {
  return (
    <Layout>
      <PageHeader title="Overdue tasks" />

      <TaskList />
    </Layout>
  );
};
