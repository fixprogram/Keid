import Accordion from "@/widgets/Accordion";
import FilterBar from "@/features/FilterBar";
import { useState } from "react";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { FILTERS } from "@/templates/ProjectPage/config/filters";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { setActiveFilter } from "@/templates/ProjectPage/store/projectSlice";
import AllTaskAccordions from "../AllTaskAccordions";

// const tasks = [
//   {
//     id: "1",
//     title: "My first task",
//     progress: 75,
//     deadline: "Apr 1",
//   },
// ];

export default function TaskList() {
  // const filters = ["All tasks", "Ideas", "Completed"];
  // const [activeFilter, setActiveFilter] = useState(filters[0]);
  const filters = FILTERS;
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.project.activeFilter);
  const tasks = useAppSelector((state) => state.project.filteredTasks);

  console.log("filtered tasks: ", tasks);

  return (
    <>
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        filterClickHandler={(filter: string) =>
          dispatch(setActiveFilter(filter))
        }
      />

      <section>
        {activeFilter === "All tasks" ? (
          // filters.map((filter) => {
          //   if (filter === "All tasks") {
          //     return <Accordion key={filter} topic="Tasks" items={tasks} />;
          //   }

          //   return <Accordion key={filter} topic={filter} items={tasks} />;
          // })
          <AllTaskAccordions />
        ) : (
          <Accordion topic={activeFilter} items={tasks} />
        )}
      </section>
    </>
  );
}
