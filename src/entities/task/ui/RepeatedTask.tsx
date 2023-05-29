import { projectStyles, ProjectStyleKey } from "@/shared/config/projectStyles";
import Icon from "@/shared/ui/Icon";
import Link from "next/link";
import { FC } from "react";

type RepeatedTaskPropsType = {
  link: string;
  title: string;
  deadline: string | null;
  style: string;
  progress: number;
  daysToRepeat: number;
  isStarred?: boolean;
};

export const RepeatedTask: FC<RepeatedTaskPropsType> = ({
  link,
  title,
  deadline,
  style,
  progress,
  daysToRepeat,
  isStarred = false,
}) => {
  const taskStyle = projectStyles[style as ProjectStyleKey];

  return (
    <Link
      href={link}
      className="min-h-[100px] p-4 pl-5 rounded-xl bg-background2"
    >
      <div className="grid grid-cols-task gap-x-5 gap-y-4 relative">
        {isStarred ? (
          <div className="absolute top-3 left-3">
            <Icon name="star-sm" width={8} height={8} />
          </div>
        ) : null}

        <div>
          <h3 className="text-white text-lg font-semibold">{title}</h3>
        </div>

        {deadline ? (
          <p
            className="font-medium text-deactive text-sm"
            style={{ color: taskStyle.background }}
          >
            {deadline}
          </p>
        ) : null}

        <div
          className="w-full h-3 bg-white/10 rounded-full"
          style={{ gridArea: "2 / 1 / 2 / 4" }}
        >
          <div
            className="rounded-full h-full flex items-center justify-center"
            style={{
              width: `${progress}%`,
              background: taskStyle.background,
            }}
          >
            <span className="text-sm text-white font-bold px-3 rounded-full h-[24px]">
              {Math.floor((progress / 100) * daysToRepeat)}/{daysToRepeat}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};
