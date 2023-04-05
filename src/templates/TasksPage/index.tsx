import { toggleListStyle } from "@/templates/ProjectsPage/store/projectsSlice";
import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import ProjectList from "@/features/ProjectList";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Icon from "@/shared/ui/Icon";
import Layout from "@/widgets/Layout";
import { setActiveFilter } from "../ProjectPage/store/projectSlice";
import TaskList from "./components/TaskList";

export default function TasksPage() {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.tasks.filters);
  const activeFilter = useAppSelector((state) => state.tasks.activeFilter);
  //   const listStyle = useAppSelector((state) => state.tasks.listStyle);

  //   const actionIconName = listStyle === "column" ? "dashboard" : "goals";

  return (
    <Layout>
      <PageHeader title="Tasks" />

      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        filterClickHandler={(filter: string) =>
          dispatch(setActiveFilter(filter))
        }
      >
        {/* <button type="button" onClick={() => dispatch(toggleListStyle())}>
            <Icon name={actionIconName} width={22} height={22} />
          </button> */}
      </FilterBar>

      {/* <ProjectList /> */}

      <TaskList />
    </Layout>
  );
}
