import {
  FilterType,
  setActiveFilter,
  toggleListStyle,
} from "@/templates/ProjectsPage/store/projectsSlice";
import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import ProjectList from "@/features/ProjectList";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Icon from "@/shared/ui/Icon";
import Layout from "@/widgets/Layout";

export default function ProjectsPage() {
  const dispatch = useAppDispatch();
  const filters = useAppSelector((state) => state.projects.filters);
  const activeFilter = useAppSelector((state) => state.projects.activeFilter);
  const listStyle = useAppSelector((state) => state.projects.listStyle);

  const actionIconName = listStyle === "column" ? "dashboard" : "goals";

  return (
    <Layout>
      <PageHeader title="Projects" />

      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        filterClickHandler={(filter: FilterType) =>
          dispatch(setActiveFilter(filter))
        }
      >
        <button type="button" onClick={() => dispatch(toggleListStyle())}>
          <Icon name={actionIconName} width={22} height={22} />
        </button>
      </FilterBar>

      <ProjectList />
    </Layout>
  );
}
