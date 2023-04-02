import Accordion from "@/widgets/Accordion";
import FilterBar from "@/features/FilterBar";
import { useState } from "react";

const tasks = [
  {
    id: "1",
    title: "My first task",
    progress: 75,
    deadline: "Apr 1",
  },
];

export default function TaskList() {
  const filters = ["All tasks", "Ideas", "Completed"];
  const [activeFilter, setActiveFilter] = useState(filters[0]);

  return (
    <>
      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        filterClickHandler={(filter: string) => setActiveFilter(filter)}
      />

      <section>
        {activeFilter === "All tasks" ? (
          filters.map((filter) => {
            if (filter === "All tasks") {
              return <Accordion key={filter} topic="Tasks" items={tasks} />;
            }

            return <Accordion key={filter} topic={filter} items={tasks} />;
          })
        ) : (
          <Accordion topic={activeFilter} items={tasks} />
        )}

        {/* {filters.map(filter => {
          if(filter === 'All tasks') {
            return <Accordion key={filter} topic="Tasks" items={tasks} />
          }

          return <Accordion key={filter} topic={filter} items={tasks} />
        })} */}
      </section>
    </>
  );
}
