import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import { useAppDispatch } from "@/shared/lib/hooks/useAppDispatch";
import { useAppSelector } from "@/shared/lib/hooks/useAppSelector";
import Icon from "../../../../shared/ui/Icon";
import { useToggleStarred } from "../../hooks/useToggleStarred";
import { openSettings } from "../../store/projectSlice";
import { ProjectTitle } from "./ProjectTitle";
import ScreenList from "./ScreenList";

export default function ProjectHeader() {
  const dispatch = useAppDispatch();
  const project = useAppSelector((state) => state.project);
  const handleToggleStarred = useToggleStarred();

  const { title, style, tasks, isStarred } = project;

  const projectStyle = projectStyles[style as keyof ProjectStyleType];
  const screens = ["Overview"];
  if (tasks["All"].length) {
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
        <Icon name="project" width={24} height={24} />
      </div>

      <div className="grow">
        <ProjectTitle initialTitle={title} />
        {/* <h2 className="text-xl text-white font-semibold">{title}</h2> */}

        <ScreenList screens={screens} />
      </div>

      <button type="button" onClick={handleToggleStarred}>
        {isStarred ? (
          <Icon name="starred" width={32} height={32} />
        ) : (
          <Icon name="star" width={24} height={24} />
        )}
      </button>

      <button
        type="button"
        className="mr-[10px]"
        onClick={() => dispatch(openSettings())}
      >
        <Icon name="settings" width={24} height={24} />
      </button>
    </section>
  );
}
