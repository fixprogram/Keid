import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { FILTERS } from "@/templates/ProjectPage/config/consts";
import Accordion from "@/widgets/Accordion";
import { Fragment } from "react";

export default function AllTaskAccordions() {
  const tasks = useAppSelector((state) => state.project.tasks);

  return (
    <Fragment>
      {FILTERS.map((filter) => {
        if (filter === "All") {
          return (
            <Accordion key={filter} topic="All tasks" items={tasks["All"]} />
          );
        }

        return <Accordion key={filter} topic={filter} items={tasks[filter]} />;
      })}
    </Fragment>
  );
}
