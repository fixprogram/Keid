import PageHeader from "@/features/PageHeader";
import { TaskType } from "@/shared/lib/utils/sortTasks";
import Layout from "@/widgets/Layout";
import { Task } from "@prisma/client";
import { FC } from "react";
import { TaskList } from "./ui/TaskList";

interface OverdueTasksPagePropsType {
  tasks: TaskType[];
}

export const OverdueTasksPage: FC<OverdueTasksPagePropsType> = ({ tasks }) => {
  // console.log("tasks: ", tasks);

  return (
    <Layout>
      <PageHeader title="Overdue tasks" />

      <TaskList tasks={tasks} />
    </Layout>
  );
};
