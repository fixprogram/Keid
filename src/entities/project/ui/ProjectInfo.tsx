import { FC, Fragment } from "react";
import Icon from "@/shared/ui/Icon";
import { ProjectStyleType } from "@/shared/config/projectStyles";

interface ProjectInfoPropsType {
  projectStyle: ProjectStyleType;
  title: string;
  category: string;
  isStarred: boolean;
}

export const ProjectInfo: FC<ProjectInfoPropsType> = ({
  projectStyle,
  title,
  category,
  isStarred,
}) => {
  if (title === "No project") {
    return null;
  }

  return (
    <Fragment>
      <div
        className={`p-2 rounded-xl w-[40px] h-[40px] mt-1`}
        style={{ background: projectStyle.background }}
      >
        <Icon
          name="project"
          width={24}
          height={24}
          color={projectStyle.textColor}
        />
      </div>

      <div>
        <h3 className="text-white text-lg font-semibold">
          {isStarred ? (
            <Icon name="starred" height={18} width={18} isInline={true} />
          ) : null}{" "}
          {title}
        </h3>
        {/* <p className="font-medium text-deactive text-sm">{category}</p> */}
      </div>
    </Fragment>
  );
};
