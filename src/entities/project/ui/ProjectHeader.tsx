import { useToggleStarred } from "@/entities/project/models/useToggleStarred";
import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Icon from "@/shared/ui/Icon";
import { useRouter } from "next/navigation";
import { FC } from "react";
import { ProjectScreenList } from "./ProjectScreenList";
import { ProjectSettings } from "./ProjectSettings";
import { ProjectTitle } from "./ProjectTitle";

interface ProjectHeaderPropType {
  style: string;
  title: string;
  isStarred: boolean;
}

export const ProjectHeader: FC<ProjectHeaderPropType> = ({
  style,
  title,
  isStarred,
}) => {
  const router = useRouter();
  const handleToggleStarred = useToggleStarred();

  const projectStyle = projectStyles[style as ProjectStyleKey];

  return (
    <section className="flex items-start gap-6">
      <div
        className={`p-2 rounded-xl w-[40px] h-[40px]`}
        style={{ background: projectStyle.background }}
        onClick={() => router.back()}
      >
        <Icon name="project" width={24} height={24} />
      </div>

      <div className="grow">
        <ProjectTitle initialTitle={title} />

        <ProjectScreenList />
      </div>

      <button type="button" onClick={handleToggleStarred}>
        {isStarred ? (
          <Icon name="starred" width={32} height={32} />
        ) : (
          <Icon name="star" width={24} height={24} />
        )}
      </button>

      <ProjectSettings />
    </section>
  );
};
