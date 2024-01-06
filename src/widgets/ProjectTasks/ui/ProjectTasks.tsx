import Accordion from "@/widgets/Accordion";
import FilterBar from "@/features/FilterBar";
// import AllTaskAccordions from "./AllTaskAccordions";
import { FC, useState } from "react";
import { sortTasks } from "@/shared/lib/utils/sortTasks";
import { mapTasks } from "@/entities/task/lib/mapTasks";
import { AllTasks } from "./AllTasks";
import { Task } from "@prisma/client";
import { useProjectStore } from "@/entities/project/models/projectStore";
import { TaskFilterType, TASK_FILTERS } from "@/entities/task/config/consts";
import { TaskType } from "@/shared/config/types";
import { mapTasksIntoHierarchy } from "@/entities/task";

interface ProjectTasksPropsType {
  initialTasks: TaskType[];
}

// export const ProjectTasks: FC = () => {
export const ProjectTasks: FC<ProjectTasksPropsType> = ({ initialTasks }) => {
  // const initialTasks = useProjectStore((state) => state.data.tasks);
  const [activeFilter, setActiveFilter] = useState(TASK_FILTERS[0]);

  if (!initialTasks.length) {
    return <div className="text-white">No tasks yet</div>;
  }

  const allTasks = sortTasks(initialTasks);

  const tasks = mapTasks(allTasks);

  return (
    <>
      <FilterBar
        filters={TASK_FILTERS}
        activeFilter={activeFilter}
        filterClickHandler={(filter: TaskFilterType) => setActiveFilter(filter)}
      />

      <section>
        {activeFilter === "All" ? (
          <AllTasks tasks={tasks} />
        ) : (
          <Accordion topic={activeFilter} items={tasks[activeFilter]} />
        )}
      </section>
    </>
  );
};
