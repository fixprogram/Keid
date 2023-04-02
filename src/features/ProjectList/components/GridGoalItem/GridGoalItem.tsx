import { ProjectType } from "@/app/store/projectsSlice";
import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import Link from "next/link";
import Icon from "@/shared/ui/Icon";

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
      <div className="flex flex-col h-full ">
        <div
          className={`p-2 rounded-xl w-[40px] h-[40px]`}
          style={{ backgroundColor: projectStyle.background }}
        >
          <Icon name="goal" width={24} height={24} />
        </div>

        <div className="mt-3">
          <h3 className="text-white text-lg font-semibold">{title}</h3>
          <p className="font-medium text-deactive text-sm">{category}</p>
        </div>

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
