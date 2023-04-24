import PageHeader from "@/features/PageHeader";
import Layout from "@/widgets/Layout";
import { Task } from "@prisma/client";
import { FC } from "react";
import { TaskList } from "./ui/TaskList";

interface OverdueTasksPagePropsType {
  tasks: Task[];
}

export const OverdueTasksPage: FC<OverdueTasksPagePropsType> = ({ tasks }) => {
  return (
    <Layout>
      <PageHeader title="Overdue tasks" />

      <TaskList tasks={tasks} />
    </Layout>
  );
};
