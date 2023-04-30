import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import Icon from "@/shared/ui/Icon";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import Link from "next/link";
import { FC } from "react";

type OverdueTaskPropsType = {
  link: string;
  title: string;
  deadline: string | null;
  style: string;
  progress: number;
  isStarred?: boolean;
};

export const OverdueTask: FC<OverdueTaskPropsType> = ({
  link,
  title,
  deadline,
  style,
  progress,
  isStarred = false,
}) => {
  const taskStyle = projectStyles[style as keyof ProjectStyleType];

  return (
    <Link href={link}>
      <div className="bg-background2 p-5 flex gap-5 rounded-xl relative">
        {isStarred ? (
          <div className="absolute top-3 left-3">
            <Icon name="star-sm" width={8} height={8} />
          </div>
        ) : null}

        <RoundProgressBar
          id={link}
          progress={progress}
          stopColors={taskStyle.progressGradient}
        />

        <div>
          <b className="text-lg text-white font-semibold">{title}</b>
          {deadline ? (
            <p className="text-smm font-medium text-expired">{deadline}</p>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
