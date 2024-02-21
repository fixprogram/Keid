import { mapTasksIntoHierarchy } from "@/entities/task";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { TaskType } from "@/shared/config/types";
import { FC } from "react";

interface TasksBlockPropsType {
  tasks: TaskType[];
  title?: string;
}

export const TasksBlock: FC<TasksBlockPropsType> = ({
  tasks,
  title = "Tasks",
}) => {
  const taskTrees = mapTasksIntoHierarchy(tasks);

  return (
    <section className="mt-8 relative">
      <h3 className="font-poppins font-semibold text-xl text-white">{title}</h3>

      {taskTrees.length ? (
        <section
          className="mt-5 flex flex-col gap-4"
          style={{ maxHeight: 272, overflowY: "scroll" }}
        >
          {taskTrees.map((task) => (
            <TaskCard key={task.id} {...task} withoutDeadline />
          ))}
        </section>
      ) : null}
    </section>
  );
};
