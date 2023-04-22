import { projectStyles, ProjectStyleType } from "@/shared/config/projectStyles";
import RoundProgressBar from "@/shared/ui/RoundProgressBar";
import Link from "next/link";
import { FC } from "react";

type OverdueTaskPropsType = {
  link: string;
  title: string;
  deadline: string;
  style: string;
  progress: number;
};

export const OverdueTask: FC<OverdueTaskPropsType> = ({
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

        <div>
          <b
            className="text-lg text-white font-semibold"
            style={{ color: "#FF968E" }}
          >
            {title}
          </b>
          <p className="text-smm font-medium" style={{ color: "#FF968E" }}>
            {deadline}
          </p>
        </div>
      </div>
    </Link>
  );
};
