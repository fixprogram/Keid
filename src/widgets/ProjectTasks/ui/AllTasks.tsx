import { mapTasksIntoHierarchy } from "@/entities/task";
import { TaskCard } from "@/entities/task/ui/TaskCard";
import { TaskType } from "@/shared/config/types";
import Accordion from "@/widgets/Accordion";
import { FC, Fragment } from "react";

interface AllTasksPropsType {
  tasks: {
    All: TaskType[];
    Completed: TaskType[];
    "To do": TaskType[];
  };
}

export const AllTasks: FC<AllTasksPropsType> = ({ tasks }) => {
  const allTasks = mapTasksIntoHierarchy(tasks["All"]);
  return (
    <Fragment>
      {/* <Accordion topic="All tasks" items={tasks["All"]} /> */}

      {/* {PROJECT_TASK_FILTERS.map((filter) => {
        if (filter === "All") {
          return (
            <Accordion key={filter} topic="All tasks" items={tasks["All"]} />
          );
        }

        return <Accordion key={filter} topic={filter} items={tasks[filter]} />;
      })} */}

      <ul className="mt-6 flex flex-col gap-4">
        {allTasks.map((item) => (
          <li key={item.id}>
            <TaskCard {...item} />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};
