import { ProjectType } from "@/entities/project/models/projectsStore";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Link from "next/link";
import { ProjectInfo } from "./ProjectInfo";
import { FC } from "react";

interface GridProjectItemPropsType {
  project: ProjectType;
}

export const GridProjectItem: FC<GridProjectItemPropsType> = ({ project }) => {
  const {
    style,
    title,
    taskAmount,
    completedTaskAmount,
    projectProgress,
    isStarred,
  } = project;
  const category = "Category";

  const projectStyle = projectStyles[style as ProjectStyleKey];
  return (
    <Link
      href={`projects/${project.id}`}
      className="min-h-[100px] p-5 rounded-xl bg-background2/50"
    >
      <div className="flex flex-col h-full gap-3">
        <ProjectInfo
          projectStyle={projectStyle}
          title={title}
          category={category}
          isStarred={isStarred}
        />

        {taskAmount !== 0 ? (
          <div className="mt-auto flex items-center justify-between">
            <div className="w-full h-1 bg-white/10 rounded-full">
              <div
                className="rounded-full h-full"
                style={{
                  width: `${projectProgress}%`,
                  background: projectStyle.gradient,
                }}
              ></div>
            </div>

            <div className={`text-xs text-white font-medium ml-[14px]`}>
              {completedTaskAmount}/{taskAmount}
            </div>
          </div>
        ) : null}
      </div>
    </Link>
  );
};
