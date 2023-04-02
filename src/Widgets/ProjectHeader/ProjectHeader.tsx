import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Icon from "../../shared/ui/Icon";
import ScreenList from "./ScreenList";

export default function ProjectHeader() {
  const project = useAppSelector((state) => state.project);

  const { title, style, tasks } = project;

  const projectStyle = projectStyles[style as keyof ProjectStyleType];
  const screens = ["Overview"];
  if (tasks.length) {
    screens.push("Task List");
  }

  if (projectStyle === undefined) {
    return null;
  }
  return (
    <section className="flex items-start gap-6">
      <div
        className={`p-2 rounded-xl w-[40px] h-[40px]`}
        style={{ background: projectStyle.background }}
      >
        <Icon name="goal" width={24} height={24} />
      </div>

      <div className="grow">
        <h2 className="text-xl text-white font-semibold">{title}</h2>

        <ScreenList screens={screens} />
      </div>

      <button type="button" className="mr-[10px]">
        <Icon name="settings" width={24} height={24} />
      </button>
    </section>
  );
}
