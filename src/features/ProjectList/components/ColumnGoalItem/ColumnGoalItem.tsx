import { ProjectType } from "@/templates/ProjectsPage/store/projectsSlice";
import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import Link from "next/link";
import ProjectInfo from "@/features/ProjectInfo";

type Props = {
  project: ProjectType;
};

export default function ColumnGoalItem({ project }: Props) {
  const { style, title, taskAmount, completedTaskAmount } = project;
  const category = "Category";

  const projectStyle = projectStyles[style as keyof ProjectStyleType];

  return (
    <Link
      href={`projects/${project.id}`}
      className="min-h-[100px] p-4 pl-5 rounded-xl bg-background2/50"
    >
      <div className="grid grid-cols-item gap-x-5 gap-y-4 ">
        <ProjectInfo
          backgroundColor={projectStyle.background}
          title={title}
          category={category}
        />

        {taskAmount !== 0 ? (
          <>
            <div
              className={`text-sm text-white font-bold px-3 rounded-full h-[24px]`}
              style={{ backgroundColor: projectStyle.background }}
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
                  width: `${(completedTaskAmount / taskAmount) * 100}%`,
                  background: projectStyle.gradient,
                }}
              ></div>
            </div>
          </>
        ) : null}
      </div>
    </Link>
  );
}
