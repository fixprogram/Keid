import { TaskCard } from "@/features/TaskCard";
import { TaskType } from "@/shared/lib/utils/sortTasks";
import { Task } from "@prisma/client";
import { FC } from "react";

interface TaskListPropsType {
  tasks: TaskType[];
}

export const TaskList: FC<TaskListPropsType> = ({ tasks }) => {
  return (
    <section className="mt-8 flex flex-col gap-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} link={`/tasks/${task.id}`} {...task} />
      ))}
    </section>
  );
};
