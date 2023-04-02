import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import ColumnGoalItem from "./components/ColumnGoalItem";
import GridGoalItem from "./components/GridGoalItem";

export default function ProjectList() {
  const listStyle = useAppSelector((state) => state.projects.listStyle);
  const projects = useAppSelector((state) => state.projects.projects);

  if (projects.length === 0) {
    return <div>No projects yet</div>;
  }

  return (
    <ul
      className={`mt-8 grid gap-4 ${
        listStyle === "grid" ? "grid-cols-2" : null
      }`}
    >
      {projects.map((project) => {
        if (listStyle === "grid") {
          return <GridGoalItem key={project.id} project={project} />;
        }
        return <ColumnGoalItem key={project.id} project={project} />;
      })}
    </ul>
  );
}
