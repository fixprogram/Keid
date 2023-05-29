import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Link from "next/link";
import { ProjectInfo } from "./ProjectInfo";
import { FC } from "react";
import { ProjectType } from "@/entities/project/models/projectsStore";

interface ColumnProjectItemPropsType {
  project: ProjectType;
}

export const ColumnProjectItem: FC<ColumnProjectItemPropsType> = ({
  project,
}) => {
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
      className="min-h-[100px] p-4 pl-5 rounded-xl bg-background2/50"
    >
      <div className="grid grid-cols-item gap-x-5 gap-y-4 ">
        <ProjectInfo
          projectStyle={projectStyle}
          title={title}
          category={category}
          isStarred={isStarred}
        />

        {taskAmount !== 0 ? (
          <>
            <div
              className={`text-sm font-bold px-3 rounded-full h-[24px]`}
              style={{
                backgroundColor: projectStyle.background,
                color: projectStyle.textColor,
              }}
            >
              {completedTaskAmount}/{taskAmount}
            </div>

            <div
              className="w-full h-1 bg-white/10 rounded-full"
              style={{ gridArea: "2 / 1 / 2 / 4" }}
            >
              <div
                className="rounded-full h-full"
                style={{
                  width: `${projectProgress}%`,
                  background: projectStyle.gradient,
                }}
              />
            </div>
          </>
        ) : null}
      </div>
    </Link>
  );
};
