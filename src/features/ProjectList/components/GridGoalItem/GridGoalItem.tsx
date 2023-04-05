import { ProjectType } from "@/templates/ProjectsPage/store/projectsSlice";
import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import Link from "next/link";
import ProjectInfo from "@/features/ProjectInfo";

type Props = {
  project: ProjectType;
};

export default function GridGoalItem({ project }: Props) {
  const { style, title, taskAmount, completedTaskAmount } = project;
  const category = "Category";

  const projectStyle = projectStyles[style as keyof ProjectStyleType];
  return (
    <Link
      href={`projects/${project.id}`}
      className="min-h-[100px] p-5 rounded-xl bg-background2/50"
    >
      <div className="flex flex-col h-full gap-3">
        <ProjectInfo
          backgroundColor={projectStyle.background}
          title={title}
          category={category}
        />

        {taskAmount !== 0 ? (
          <div className="mt-auto flex items-center justify-between">
            <div className="w-full h-1 bg-white/10 rounded-full">
              <div
                className="rounded-full h-full"
                style={{
                  width: `${(completedTaskAmount / taskAmount) * 100}%`,
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
}
