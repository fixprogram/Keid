import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import Link from "next/link";
import { FC } from "react";

type InProgressTaskPropsType = {
  link: string;
  title: string;
  deadline: string | null;
  style: string;
  progress: number;
};

export const InProgressTask: FC<InProgressTaskPropsType> = ({
  link,
  title,
  deadline,
  style,
  progress,
}) => {
  const taskStyle = projectStyles[style as keyof ProjectStyleType];

  return (
    <Link href={link}>
      <div className="bg-background2 p-5 flex gap-5 rounded-xl ">
        <RoundProgressBar
          id={link}
          progress={progress}
          stopColors={taskStyle.progressGradient}
        />

        <div className="flex flex-col justify-center align-center">
          <b className="text-lg text-white font-semibold">{title}</b>
          {deadline ? (
            <p
              className="text-smm font-medium"
              style={{ color: taskStyle.background }}
            >
              {deadline}
            </p>
          ) : null}
        </div>
      </div>
    </Link>
  );
};
