import Accordion from "@/widgets/Accordion";
import FilterBar from "@/features/FilterBar";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { setActiveFilter } from "@/templates/ProjectPage/store/projectSlice";
import AllTaskAccordions from "../AllTaskAccordions";
import { FILTERS } from "@/templates/ProjectPage/config/consts";
import { FilterType } from "@/templates/ProjectPage/config/types";

export default function TaskList() {
  const dispatch = useAppDispatch();
  const activeFilter = useAppSelector((state) => state.project.activeFilter);
  const tasks = useAppSelector((state) => state.project.tasks);

  return (
    <>
      <FilterBar
        filters={FILTERS}
        activeFilter={activeFilter}
        filterClickHandler={(filter: FilterType) =>
          dispatch(setActiveFilter(filter))
        }
      />

      <section>
        {activeFilter === "All" ? (
          <AllTaskAccordions />
        ) : (
          <Accordion topic={activeFilter} items={tasks[activeFilter]} />
        )}
      </section>
    </>
  );
}
