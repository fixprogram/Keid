import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { FILTERS } from "@/templates/ProjectPage/config/filters";
import Accordion from "@/widgi/Accordion";
import { Fragment } from "react";

export default function AllTaskAccordions() {
  const filters = FILTERS;
  const tasks = useAppSelector((state) => state.project.filteredTasks);

  return (
    <Fragment>
      {filters.map((filter) => {
        if (filter === "All tasks") {
          return (
            <Accordion
              key={filter}
              topic="To do"
              items={tasks.filter((task) => task.state === "Task")}
            />
          );
        }

        return (
          <Accordion
            key={filter}
            topic={filter}
            items={tasks.filter((task) => task.state === filter)}
          />
        );
      })}
    </Fragment>
  );
}
