import { sortProjects } from "@/shared/lib/utils/sortProjects";
import { useProjectsStore } from "@/entities/project/models/projectsStore";
import { FC } from "react";
import { ColumnProjectItem } from "./ColumnProjectItem";
import { GridProjectItem } from "./GridProjectItem";

interface ProjectListPropsType {
  listStyle: "grid" | "column";
}

export const ProjectList: FC<ProjectListPropsType> = ({ listStyle }) => {
  const activeProjects = useProjectsStore((state) => state.activeProjects);

  if (activeProjects.length === 0) {
    return <div className="text-white">No projects yet</div>;
  }

  return (
    <ul
      className={`mt-8 grid gap-4 ${
        listStyle === "grid" ? "grid-cols-2" : null
      }`}
    >
      {activeProjects.map((project) => {
        if (listStyle === "grid") {
          return <GridProjectItem key={project.id} project={project} />;
        }
        return <ColumnProjectItem key={project.id} project={project} />;
      })}
    </ul>
  );
};
