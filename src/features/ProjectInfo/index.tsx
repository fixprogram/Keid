import { Fragment } from "react";
import Icon from "@/shared/ui/Icon";

type Props = {
  backgroundColor: string;
  title: string;
  category: string;
};

export default function ProjectInfo({
  backgroundColor,
  title,
  category,
}: Props) {
  if (title === "No project") {
    return null;
  }

  return (
    <Fragment>
      <div
        className={`p-2 rounded-xl w-[40px] h-[40px] mt-1`}
        style={{ backgroundColor }}
      >
        <Icon name="project" width={24} height={24} />
      </div>

      <div>
        <h3 className="text-white text-lg font-semibold">{title}</h3>
        <p className="font-medium text-deactive text-sm">{category}</p>
      </div>
    </Fragment>
  );
}
