import Accordion from "@/widgets/Accordion";
import FilterBar from "@/features/FilterBar";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { FILTERS } from "@/templates/ProjectPage/config/filters";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { setActiveFilter } from "@/templates/ProjectPage/store/projectSlice";
import AllTaskAccordions from "../AllTaskAccordions";

export default function TaskList() {
  const filters = FILTERS;
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.project.activeFilter);
  const tasks = useAppSelector((state) => state.project.filteredTasks);

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
          <AllTaskAccordions />
        ) : (
          <Accordion topic={activeFilter} items={tasks} />
        )}
      </section>
    </>
  );
}
