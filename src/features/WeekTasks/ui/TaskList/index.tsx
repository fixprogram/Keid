import { TaskCard } from "@/entities/task/ui/TaskCard";
import { Task } from "@prisma/client";
import { FC } from "react";

type TaskType = Task & { type?: string; isFavourite: boolean };

interface TaskListPropsType {
  tasks: TaskType[];
}

export const TaskList: FC<TaskListPropsType> = ({ tasks }) => {
  return (
    <ul className="mt-4 flex flex-col gap-4">
      {tasks.map((task) => (
        <li key={task.id}>
          <TaskCard
            key={task.id}
            link={task.type ? `/subtasks/${task.id}` : `/tasks/${task.id}`}
            {...task}
          />
        </li>
      ))}
    </ul>
  );
};
