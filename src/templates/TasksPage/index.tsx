import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Layout from "@/widgets/Layout";
import { setActiveFilter } from "../ProjectPage/store/projectSlice";
import TaskList from "./components/TaskList";

export default function TasksPage() {
  const dispatch = useAppDispatch();

  const filters = useAppSelector((state) => state.tasks.filters);
  const activeFilter = useAppSelector((state) => state.tasks.activeFilter);

  return (
    <Layout>
      <PageHeader title="Tasks" />

      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        filterClickHandler={(filter: string) =>
          dispatch(setActiveFilter(filter))
        }
      ></FilterBar>

      <TaskList />
    </Layout>
  );
}
