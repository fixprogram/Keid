import { ProjectType } from "@/templates/ProjectsPage/store/projectsSlice";
import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import Link from "next/link";
import Icon from "../../../../shared/ui/Icon";

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
        <div
          className={`p-2 rounded-xl w-[40px] h-[40px] mt-1`}
          style={{ backgroundColor: projectStyle.background }}
        >
          <Icon name="goal" width={24} height={24} />
        </div>

        <div className="mt-1">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <p className="font-medium text-deactive text-sm">{category}</p>
        </div>

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
