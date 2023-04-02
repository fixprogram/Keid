import Icon from "@/shared/ui/Icon";
import Layout from "@/widgets/Layout";
import FilterBar from "@/features/FilterBar";
import PageHeader from "@/features/PageHeader";
import ProjectList from "@/features/ProjectList";
import { getSession } from "next-auth/react";
import { getUserProjects } from "@/entities/user/models/getUserProjects";
import {
  setActiveFilter,
  setupProjects,
  toggleListStyle,
} from "@/app/store/projectsSlice";
import { wrapper } from "@/app/store/store";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";

const GOALS = [
  {
    title: "Find a job",
    id: 1,
    category: "Text",
    allTasksAmount: 10,
    completedTasksAmount: 3,
    color: "colorful01",
    // color: "#A06AF9",
  },
  {
    title: "Level up relationships",
    id: 2,
    category: "Text",
    allTasksAmount: 9,
    completedTasksAmount: 7,
    color: "#FBA3FF",
  },
  {
    title: "Launch Keid",
    id: 3,
    category: "Text",
    allTasksAmount: 9,
    completedTasksAmount: 7,
    color: "#FFDD72",
  },
  {
    title: "Learn how to do 20 pull ups",
    id: 4,
    category: "Text",
    allTasksAmount: 8,
    completedTasksAmount: 7,
    color: "#8E96FF",
  },
];

export default function Projects() {
  const dispatch = useAppDispatch();
  const projects = useAppSelector((state) => state.projects.projects);
  const filters = useAppSelector((state) => state.projects.filters);
  const activeFilter = useAppSelector((state) => state.projects.activeFilter);
  const listStyle = useAppSelector((state) => state.projects.listStyle);

  const actionIconName = listStyle === "column" ? "dashboard" : "goals";

  console.log("Projects: ", projects);

  return (
    <Layout>
      <PageHeader title="Projects" />

      <FilterBar
        filters={filters}
        activeFilter={activeFilter}
        filterClickHandler={(filter: string) =>
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

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const session = await getSession(context);

    const userId = session?.user.id as string;

    const projects = await getUserProjects(userId);

    store.dispatch(setupProjects(projects));
  }
);
